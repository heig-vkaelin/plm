---
# try also 'default' to start simple
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://source.unsplash.com/collection/94734566/1920x1080
# apply any windi css classes to the current slide
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: false
# some information about the slides, markdown enabled
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
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
    Press Space for next page <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 flex gap-2">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon:edit />
  </button>
  <a href="https://github.com/slidevjs/slidev" target="_blank" alt="GitHub"
    class="text-xl slidev-icon-btn opacity-50 !border-none !hover:text-white">
    <carbon-logo-github />
  </a>
</div>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---
layout: two-cols
---

# Sommaire

<!-- Slidev is a slides maker and presenter designed for developers, consist of the following features -->
<br>

- Historique
- Erlang
- Utilisation
- Avantages
- Fonctionnalités
- Particularités

::right::

<div class="flex flex-col items-end">
  <img src="/elixir.png" class="w-80 mt-24"/>
</div>

---
layout: image-right
image: /jose-valim.jpg
---


# Historique

<!-- Slidev is a slides maker and presenter designed for developers, consist of the following features -->
<br>

- Créé par José Valim en 2012
- Acteur majeu de l'eco-système Ruby et Ruby on Rails

<br>
<br>

- Son souhait pour Elixir : 
  - Aussi accessible que Ruby
  - Avec de meilleures performances et une résilience à toute épreuve
<br>
<br>

<!-- 
Brésilien, core contributeur Ruby on Rails

Choix de la machine virtuelle Erland pour justement avoir une super résilience
 -->


---
layout: two-cols
---

# Machine virtuelle Erlang

<br>

- Elixir est créé sur la VM Erlang "BEAM"
- Développée dans les années 80 par Ericsson
- Afin de gérer les infrastructures téléphoniques grandissantes

<br>

- Besoins principaux:
  - Haute concurrence
  - Bonne scalabilité

::right::

<img src="/erlang.png" class="absolute right-0 w-64"/>

<!-- Utilisé par WhatsApp pour gérer 450 millions d'users avec seulement 32 ingénieurs  -->

---
layout: two-cols
---

# Utilisation

Statistiques basées sur les réponses du sondage de Stack Overflow 2022 (~72k réponses)

<br>

Encore peu connu et peu utilisé (**2.15%**)

<br>

Mais très apprécié par ceux qui en font.

<br>

Fait partie des langages les mieux payés.

::right::

<div class="space-y-2 flex flex-col items-end">
  <img src="/elixir-known.png" class="w-35"/>
  <img src="/elixir-loved.png" class="w-96"/>
  <img src="/elixir-paid.png" class="w-78"/>
  <img src="/elixir-framework-paid.png" class="w-88"/>
</div>

<!-- Sûrement bien payé car systèmes critiques et peu de devs compétents disponibles -->

---

# Avantages

<br>

- **Concurrence** - gérer les tâches simultanées de manière efficace, grâce à son modèle de concurrence basé sur des processus légers.

- **Productivité** - syntaxe claire et concise, qui facilite la lecture et l'écriture du code (inspirée de Ruby et de Python notamment).

- **Robustesse** - Elixir est conçu pour être résilient et tolérant aux pannes. Les applications Elixir sont conçues pour continuer à fonctionner même en cas d'échec d'un processus ou d'une machine.

- **Performance** - conçu pour être hautement performant, grâce à sa capacité à gérer les tâches simultanées et à sa compilation en bytecode Erlang.

<!-- 
Voici une liste non exhaustive des avantages principaux d’Elixir:

1. Concurrence: Elixir est conçu pour gérer les tâches simultanées de manière efficace, grâce à son modèle de concurrence basé sur des processus légers.
2. Productivité: Elixir offre une syntaxe claire et concise, qui facilite la lecture et l'écriture du code, comme expliqué précédemment inspirée de Ruby et de Python notamment.
3. Robustesse: Elixir est conçu pour être résilient et tolérant aux pannes. Les applications Elixir sont conçues pour continuer à fonctionner même en cas d'échec d'un processus ou d'une machine. Elixir offre donc une faible latence et une haute disponibilité pour les systèmes en temps réels.
4. Performance: Elixir est conçu pour être hautement performant, grâce à sa capacité à gérer les tâches simultanées et à sa compilation en bytecode Erlang.

Pour résumer, Elixir est un langage de programmation puissant et polyvalent, qui offre une productivité élevée, une robustesse et des performances élevées pour les applications distribuées et en temps réel.
-->

---

# Fonctionnalités (1)

### Dynamiquement typé...

```elixir
iex> x = 1
1
iex> i x
Term
  1
Data type
  Integer
Reference modules
  Integer
Implemented protocols
  IEx.Info, Inspect, List.Chars, String.Chars
```

<br>

### mais fortement typé !

```elixir
iex> 1 + "2"
(ArithmeticError) bad argument in arithmetic expression: 1 + "2"
```

---

# Fonctionnalités (2)

Langage Fonctionnel

### TOUTES les données sont immuables

```elixir
iex> x = 1
1
iex> x = 2
2
iex> x
2
```

Nous n'avons pas changé la valeur de la variable x, nous avons réassigné le label x à une nouvelle valeur.


### Pas de "vraies" boucles

```elixir
iex> Enum.each(1..3, fn x -> IO.puts(x) end)
1
2
3
:ok
```

---

# Fonctionnalités (3)

### Pattern matching

L'opérateur **=** réalise derrière les décors un pattern matching.

```elixir
iex> [a, b] = [1, 2]
[1, 2]
iex> a
1
iex> b
2
```