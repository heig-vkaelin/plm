---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://images.unsplash.com/photo-1660165459699-a866c0386a39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: false
# some information about the slides, markdown enabled
info: |
  ## PLM - Elixir
  Presentation du projet
# persist drawings in exports and build
drawings:
  persist: false
# page transition
transition: slide-left
# use UnoCSS
css: unocss
---

# Elixir

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    Présentation du projet <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 mb-2">14.06.2023</div>
<div class="abs-bl m-6 mb-2">Valentin Kaelin</div>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---
layout: two-cols
---

# Rappel du projet


Canvas de dessin collaboratif en temps réel.

<Transform :scale="1" class="mt-20 pr-4">

- Projet en Elixir avec le framework web Phoenix
- Canvas partagé 
- Synchronisation à chaque point et pas à chaque fin de trait
- Tests de montée en charge

</Transform>

::right::

<img src="/project-context.png" class="w-105 border border-white border-opacity-50 rounded-xl p-3 bg-white"/>

---

# Démonstration

<Transform :scale="1" class="flex items-center justify-center w-full h-full">
  <a href="https://pmw.fly.dev/" class="text-6xl -mt-24">pmw.fly.dev</a>
</Transform>

---
layout: two-cols
---

# Architecture globale

- Projet Phoenix: MVC classique
  - Rendu côté serveur
  - Aucune base de données utilisée
  - Gestion du state dans la mémoire


- Canvas en temps réel -> Websocket
  - LiveView
  - Petit code JavaScript côté client

::right::

<img src="/live_view.png" class="w-80"/>

<p class="text-sm">Source: elixirschool.com</p>

---
layout: two-cols
--- 

# Backend (1)

Premier rendu de la page

Controller pour les couleurs

```elixir
defmodule PmwWeb.PageController do
  use PmwWeb, :controller

  @colors [
    '#FFFFFF',
    '#E4E4E4',
    '#888888',
    # ...
  ]

  def home(conn, _params) do
    render(conn, :home, layout: false, colors: @colors)
  end
end
```

::right::



<Transform :scale="1" class="pl-4">

Templating avec HEEx

```html
<div class="fixed bottom-0 left-0 ml-3 mb-3 z-50">
  <div id="colors" class="hidden">
    <%= for color <- @colors do %>
      <button
        data-color={color}
        class="color"
      >
        <div style={"background-color: #{color}"}></div>
      </button>
    <% end %>
  </div>
  <button id="choose-color">
    <svg color="#FFFFFF"><!-- ... --></svg>
  </button>
</div>

<div id="container"></div>
```

</Transform>

<!-- (HTML+EEx): EEx is Embedded Elixir -->

--- 

# Backend (2)

Gestion des Websockets

```elixir {all|4-7|9-10,15-16|11,17}
defmodule PmwWeb.CanvasChannel do
  use PmwWeb, :channel

  def join("canvas:points", _payload, socket) do
    state = Canvas.getAll()
    {:ok, state, socket}
  end

  def handle_in("first_point", payload, socket) do
    broadcast_from(socket, "first_point", payload)
    Canvas.add_initial(payload["id"], payload["x"], payload["y"], payload["color"])
    {:reply, {:ok, %{}}, socket}
  end

  def handle_in("new_point", payload, socket) do
    broadcast_from(socket, "new_point", payload)
    Canvas.add(payload["id"], payload["x"], payload["y"])
    {:reply, {:ok, %{}}, socket}
  end
end
```

<!-- 
1. Connexion au channel, le client rejoint
2. Ecoute les events, 1er point d'une ligne ou point suivant et les broadcast
3. Ajoute dans le state
 -->

---
layout: two-cols
---

# Backend (3)

Stockage du state dans un Agent

```elixir {all} {maxHeight:'350px'}
defmodule Canvas do
  use Agent

  def start_link(_) do
    Agent.start_link(fn -> %{} end, name: __MODULE__)
  end

  def add_initial(line_id, x, y, color) do
    Agent.update(__MODULE__, fn state ->
      state
      |> Map.put(line_id, [x, y])
      |> Map.put("#{line_id}-color", color)
    end)
  end

  def add(line_id, x, y) do
    Agent.update(__MODULE__, fn state ->
      Map.put(state, line_id, [x, y | Map.get(state, line_id)])
    end)
  end

  def getAll() do
    Agent.get(__MODULE__, fn state -> state
    end)
  end
end
```

::right::

<Transform :scale="1" class="mt-30 pl-4">
  
  * Format de l'id d'une ligne: date-uuid

  Exemple: 1686126356197-5898e1a7-4576-4043-86a2-b38fa3debdc4

  * Stockage des lignes: 
  
  Tableau de points [x1, y1, x2, y2, ...]
</Transform>

<!-- Date avant uuid pour que les lignes soient triées automatiquement lors du getAll.
Les plus récentes doivent être au dessus des plus anciennes. -->

---

# Frontend

```js
import { Socket } from "phoenix";

const socket = new Socket("/socket", {
  params: { token: window.userToken },
});
socket.connect();

const channel = socket.channel("canvas:points", {});
channel
  .join()
  .receive("ok", (state) => {
    // Affiche le state actuel au chargement de la page
  })

channel.on("first_point", (payload) => {
  // Crée la ligne
});

channel.on("new_point", (payload) => {
  // Ajoute le point à la ligne
});
```

---

# Déploiement

- Déployé sur Fly.io (PaaS dans le genre d'Heroku)
- Free tier: 1 Shared CPU, 256MB RAM

- Test de déployer la version Node de l'application:

<img src="/error-deploy-pmw-node.png" class="w-120"/>

<!-- Fly.io : PaaS (Platform as a Service) -->

---
layout: two-cols 
---

# Tests de montée en charge
Utilisation d'Artillery

### Types de tests possibles:

- Simples requêtes HTTP
- Websocket
- Tests "end-to-end" avec un navigateur headless

<br>

### Problèmes rencontrés

- Tests Websockets avec Phoenix: compliqué
- Bottleneck des tests "end-to-end": le CPU de mon ordinateur

::right::

<img src="artillery-logo.png" class="w-40 ml-auto"/>

<img src="cpu-stress-test.png" class="mt-4 w-70 ml-auto"/>

---
layout: two-cols
---

# Test Artillery

```yaml
config:
  target: https://pmw.fly.dev
  phases:
    - duration: 60
      arrivalRate: 2
      maxVusers: 10
      name: 10 Users drawing
  engines:
    playwright: {}
  processor: "./draw.js"
scenarios:
  - engine: playwright
    flowFunction: "draw"
    flow: []
```
draw.yml 

::right::

<Transform :scale="1" class="mt-10 pl-4">

```js
async function pickColor(page) {
  await page.locator("#choose-color").click();
  const randomColor = random(16) + 1;
  await page.locator(`button.color:nth-child(${randomColor})`).click();
}

async function line(page) {
  await page.mouse.move(randomX(), randomY());
  await page.mouse.down();

  await page.mouse.move(randomX(), randomY());
  await page.mouse.up();
}

async function draw(page) {
  await page.goto("https://pmw.fly.dev/");

  for (let i = 0; i < NB_LINES; i++) {
    await pickColor(page);
    await line(page);
  }
}
```
draw.js 
</Transform>

---

# Résultats (1)

<Youtube id="dSQnVATDOIs" width="711" height="400" />

<!-- TODO: ajouter comparaisons entre résultats Elixir et Node -->
