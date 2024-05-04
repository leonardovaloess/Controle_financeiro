<script setup>
import BaseTable from '@/components/BaseTable.vue'
import BaseModalCreateProduct from '@/components/BaseModalCreateProduct.vue'
import BaseFilterModal from '@/components/BaseFilterModal.vue'

import { useProductsStore } from '@/stores/products.js'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'

const productsStore = useProductsStore()

const { getProducts } = productsStore
const { productsArr } = storeToRefs(productsStore)

const filterText = ref('Nenhum')

const search = ref('')

const initProducts = async () => {
  await getProducts()
}

const filterTable = (filter) => {
  if (filter === 'Maior - Menor') {
    productsArr.value.sort((a, b) => b.preco - a.preco)
  } else if (filter === 'Menor - Maior') {
    productsArr.value.sort((a, b) => a.preco - b.preco)
  } else if (filter === 'Todos') {
    // Não faz nada, pois já temos todos os produtos em productsArr
  } else {
    productsArr.value = productsArr.value.filter((product) => {
      // Verifica se a string de filtro está presente em alguma propriedade do objeto
      return Object.keys(product).some((key) => {
        const value = product[key]
        // Verifica se a chave ou o valor correspondem à string de filtro
        return key.includes(filter) || (typeof value === 'string' && value.includes(filter))
      })
    })
  }
  localStorage.setItem('filter', filter)
  filterText.value = filter
}
const clearFilters = () => {
  productsArr.value = initProducts()
  filterText.value = 'Nenhum'
  localStorage.removeItem('filter')
}

watch(
  () => search.value,
  () => {
    if (!search.value) {
      productsArr.value = initProducts()
      return
    }
    productsArr.value = productsArr.value.filter(
      (product) => product.nome && product.nome.toLowerCase().includes(search.value)
    )
  }
)

onMounted(async () => {
  await initProducts()
})
</script>

<template>
  <h1>Despesas</h1>
  <div class="mt-3 products-container">
    <BaseModalCreateProduct />
    <BaseFilterModal @filtroDeBusca="(ev) => filterTable(ev)" />

    <div class="container-btns">
      <input type="text" placeholder="Buscar despesa" class="search-input" v-model="search" />
      <button class="create-btn" data-bs-toggle="modal" data-bs-target="#filter-modal">
        Filtrar busca
      </button>
      <button class="create-btn" @click="clearFilters">Limpar Filtro</button>
      <button class="create-btn" data-bs-toggle="modal" data-bs-target="#create-modal">
        Adicionar despesa
      </button>
    </div>
    <p class="filter-text">Filtro: {{ filterText }}</p>
    <div v-if="productsArr.length === 0" class="text-center">
      <p>Nenhum resultado encontrado para o filtro</p>
    </div>
    <BaseTable v-else :array="productsArr" />
  </div>
</template>

<style scoped lang="scss">
h1 {
  text-align: center;
}
.container-btns {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin: 3rem 0;
  margin-bottom: 0;
}
.products-container {
  position: relative;
}

.text-center {
  text-align: center;
}

.filter-text {
  text-align: start;
  width: 93%;
  margin: auto;
  padding-left: 0.9rem;
  color: rgb(77, 77, 77);
  margin-bottom: 2rem;
  margin-top: 0.5rem;
}

.search-input,
.create-btn {
  border: 1px solid rgba(0, 0, 0, 0.24);
  background: none;
  border-radius: 1rem;

  padding: 0.5rem;
  width: 150px;
  font-size: 15px;
  right: 10.2%;
  top: 0;

  &:hover {
    background-color: rgb(221, 221, 221);
    transition: 0.4s;
  }
}

.search-input {
  width: 65%;
  & :hover {
    background-color: #fff;
  }
}
</style>
