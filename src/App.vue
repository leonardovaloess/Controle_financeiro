<script setup>
import { RouterView } from 'vue-router'
import BaseNavbar from '@/components/BaseNavbar.vue'
</script>

<template>
  <main>
    <header>
      <BaseNavbar />
    </header>
    <section>
      <RouterView />
    </section>
  </main>
</template>

<style lang="scss">
main {
  background-color: #f4f4f4;
}
</style>
