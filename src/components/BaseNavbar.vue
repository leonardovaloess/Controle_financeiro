<script setup>
import { RouterLink } from 'vue-router'
import { defineProps } from 'vue'

const props = defineProps({
  toggleTheme: Function // Definindo toggleTheme como uma função
})
</script>

<template>
  <nav class="navbar navbar-expand-lg p-4">
    <div class="container-fluid">
      <h1>CONTROLE FINANCEIRO</h1>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="links" to="/">Dashboard</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="links" to="/despesas">Despesas</RouterLink>
          </li>
        </ul>
      </div>

      <!-- Usando toggleTheme como função -->
    </div>
  </nav>
</template>

<style lang="scss">
.navbar {
  background-color: rgb(252, 252, 252);
  border: 1px solid rgba(0, 0, 0, 0.205);

  #navbarNav {
    margin-left: 2rem;
  }

  .links {
    margin-right: 1rem;
    color: black;
    text-decoration: none;

    &:hover {
      color: rgb(0, 233, 0);
      transition: 0.3s;
    }
  }
  .actual-route-link {
    color: rgb(0, 233, 0);
  }
  .toggle-theme {
    background: none;
    padding: 0.4rem;
    border: 1px solid black;

    &:hover {
      background-color: rgb(233, 233, 233);
      transition: 0.4s;
    }
  }
}
</style>
