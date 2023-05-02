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
  Presentation du langage Elixir
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
    Présentation cours PLM <carbon:arrow-right class="inline"/>
  </span>
</div>

<div class="abs-br m-6 mb-2">03.05.2023</div>
<div class="abs-bl m-6 mb-2">Valentin Kaelin</div>

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
- Justification du langage
- Avantages
- Erlang
- Utilisation
- Concepts
- Particularités
- Projet

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
- Acteur majeur de l'eco-système Ruby et Ruby on Rails

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


# Justification du langage


<div class="text-2xl flex flex-col items-end justify-center h-full -mt-12">
« What kind of business could I build if what before took a hundred servers could today take two servers? I think that’s enabling a lot of innovation. »
  <span class="mt-12 text-xl">Chris McCord, créateur du framework Phoenix</span>
</div>


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

# Pourquoi ne pas utiliser Erlang directement ?

<img src="/erlang-vs-elixir.png"/>

Source: [elixirforum.com](https://elixirforum.com/t/code-snippets-to-compare-erlang-and-elixir-syntax/16443/2)

---
layout: two-cols
---

# Utilisation

Statistiques basées sur les réponses du sondage de Stack Overflow 2022 (~72k réponses)

Encore peu connu et peu utilisé (**2.15%**)

Mais très apprécié par ceux qui en font.

Fait partie des langages les mieux payés.

<div class="space-y-2 flex flex-col items-start">
  <img src="/repo-elixir.png" class="w-96"/>
  <img src="/repo-phoenix.png" class="w-96"/>
</div>

::right::

<div class="space-y-2 flex flex-col items-end">
  <img src="/elixir-known.png" class="w-35"/>
  <img src="/elixir-loved.png" class="w-96"/>
  <img src="/elixir-paid.png" class="w-78"/>
  <img src="/elixir-framework-paid.png" class="w-88"/>
</div>

<!-- Sûrement bien payé car systèmes critiques et peu de devs compétents disponibles -->
---

# Concepts (1)

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

# Concepts (2)

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

# Concepts (3)

### Process

Bien plus légers que des threads.

<div class="flex justify-between">
<div>
```elixir
defmodule Counter do
  use Agent

  def start_link(initial_value) do
    Agent.start_link(fn -> initial_value end, name: __MODULE__)
  end

  def value do
    Agent.get(__MODULE__, fn x -> x end)
  end

  def increment do
    Agent.update(__MODULE__, fn x -> x + 1 end)
  end
end
```
</div>
<div>
```elixir
iex(1)> Counter.start_link(0)
{:ok, #PID<0.114.0>}

iex(2)> Counter.value()
0

iex(3)> Counter.increment()
:ok

iex(4)> Counter.increment()
:ok

iex(5)> Counter.value()
2
```
</div>
</div>

---

# Concepts (4)
### Fail fast / let it crash

Process indépendants, qui se relancent automatiquement en cas d'erreur.

```elixir
iex> File.read("hello")
{:error, :enoent}

iex> File.write("hello", "world")
:ok

iex> File.read("hello")
{:ok, "world"}

# Ex avec pattern matching:
iex> case File.read("hello") do
...>   {:ok, body} -> IO.puts("Success: #{body}")
...>   {:error, reason} -> IO.puts("Error: #{reason}")
...> end
```

---

# Particularités (1)

### Documentation

Documentation traitée comme « first-class citizen » 

```elixir
iex(1)> h trunc
                               def trunc(number)                                
  @spec trunc(number()) :: integer()

guard: true
Returns the integer part of number.
Allowed in guard tests. Inlined by the compiler.

## Examples
    iex> trunc(5.4)
    5
    
    iex> trunc(-5.99)
    -5
    
    iex> trunc(-5)
    -5
```

---

# Particularités (2)

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

```elixir
iex> x = 1
1

iex> x
1
```

---

# Particularités (3)

### Compatibilité avec Erlang

<br>

Les modules Erlang sont directement disponibles dans le code Elixir.

```elixir
iex> Base.encode16(:crypto.hash(:sha256, "Elixir"))

"3315715A7A3AD57428298676C5AE465DADA38D951BDFAC9348A8A31E9C7401CB"
```

---
layout: two-cols
---

# Présentation projet


Canvas de dessin collaboratif en temps réel.

<Transform :scale="1" class="mt-20 pr-4">

- Canvas partagé 
- Synchronisation à chaque point et pas à chaque fin de trait
- Tests de montée en charge

</Transform>

::right::

<img src="/project-example.png" class="w-105"/>

