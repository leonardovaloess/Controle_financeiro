<script setup>
import { ref } from 'vue'
import BaseTeste from './BaseTeste.vue'
import BaseSelect from './BaseSelect.vue'

import { defineEmits } from 'vue'

const filterSearch = ref(null)

const filterToEmit = ref(null)

const emit = defineEmits(['filtroDeBusca'])

const filterOptions = ['Todos', 'Preço', 'Ano', 'Mês', 'Tipo', 'Descrição']
const descriptionOptions = ['Alimentação', 'Lazer', 'Contas', 'Carro', 'Outros']
const typeOptions = ['Entrada', 'saída']
const priceOptions = ['Maior - Menor', 'Menor - Maior']
const monthOptions = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

const emitFilter = (filter) => {
  emit('filtroDeBusca', filter)
  console.log('filtro', filter)
}
const onSubmit = (ev) => {
  ev.preventDefault()

  if (!filterSearch.value) {
    console.log(filterSearch)
    alert('Selecione os campos corretamente!')
  } else if (filterSearch.value === 'Todos') {
    emitFilter(filterSearch.value)
  } else {
    emitFilter(filterToEmit.value)
  }
  filterToEmit.value = null
  filterSearch.value = null
}
</script>

<template>
  <div
    class="modal fade"
    id="filter-modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Ordenar por:</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form @submit="onSubmit">
          <div class="modal-body">
            <BaseSelect
              name="Ordem"
              :options="filterOptions"
              :first-value="filterSearch"
              @atualizado="(e) => (filterSearch = e)"
            ></BaseSelect>
            <BaseSelect
              v-if="filterSearch === 'Mês'"
              name="Mês"
              :options="monthOptions"
              :first-value="filterToEmit"
              @atualizado="(e) => (filterToEmit = e)"
            ></BaseSelect>
            <BaseTeste
              v-if="filterSearch === 'Ano'"
              name="Ano"
              :first-value="filterToEmit"
              @atualizado="(e) => (filterToEmit = e)"
            ></BaseTeste>
            <BaseSelect
              v-if="filterSearch === 'Preço'"
              name="Ordem"
              :options="priceOptions"
              :first-value="filterToEmit"
              @atualizado="(e) => (filterToEmit = e)"
            ></BaseSelect>
            <BaseSelect
              v-if="filterSearch === 'Descrição'"
              name="Descrição"
              :options="descriptionOptions"
              :first-value="filterToEmit"
              @atualizado="(e) => (filterToEmit = e)"
            ></BaseSelect>
            <BaseSelect
              v-if="filterSearch === 'Tipo'"
              name="Tipo"
              :options="typeOptions"
              :first-value="filterToEmit"
              @atualizado="(e) => (filterToEmit = e)"
            ></BaseSelect>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
