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

- Canvas partagé 
- Synchronisation à chaque point et pas à chaque fin de trait
- Tests de montée en charge

</Transform>

::right::

<img src="/project-context.png" class="w-105 border border-white border-opacity-50 rounded-xl p-3 bg-white"/>


---

# Test