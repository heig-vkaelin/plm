<template>
  <footer v-if="$slidev.nav.currentLayout !== 'cover'">
    <div class="absolute bottom-0 left-0 px-4 py-2 text-sm">
      Valentin Kaelin
    </div>
    <div class="absolute bottom-0 right-0 px-4 py-2">
      {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}
    </div>
  </footer>
</template>
