<script setup>
import { useProductsStore } from '@/stores/products'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const productsStore = useProductsStore()

const { getOneProduct } = productsStore
const { actualProduct } = storeToRefs(productsStore)
const route = useRoute()

const id = route.params.id

onMounted(async () => {
  getOneProduct(id)
  console.log(actualProduct.value.data)
})
</script>

<template>
  <div class="container">
    <div class="container-box-title">
      <h1>Informações do Produto:</h1>
      <img src="../assets/defaultProductImage.png" alt="imgdefault" width="300px" class="mt-5" />
    </div>
    <div v-if="actualProduct.data">
      <div>
        <h2>Nome do Produto</h2>
        <p class="info">{{ actualProduct.data.name }}</p>
      </div>
      <div>
        <h2>Preço</h2>
        <p class="info">R$ {{ actualProduct.data.price }}</p>
      </div>
      <div>
        <h2>Quantidade em estoque</h2>
        <p class="info">{{ actualProduct.data.inStock }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 5rem;

  img {
    margin-left: 4rem;
  }

  .info {
    color: rgb(0, 233, 0);
  }
}
</style>
