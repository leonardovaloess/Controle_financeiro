<script setup>
import { RouterLink } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import BaseModalEditProduct from './BaseModalEditProduct.vue'

const props = defineProps({
  array: [Array, Promise]
})

const productsStore = useProductsStore()

const { deleteProduct } = productsStore

const deleteProductById = async (id) => {
  try {
    await deleteProduct(id)
    //await getProducts()
  } catch (error) {
    console.log('Erro ao deletar produto: ', error)
  }
}
</script>

<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th scope="col">Nome</th>
          <th scope="col">Preço</th>
          <th scope="col">Tipo</th>
          <th scope="col">Descrição</th>
          <th scope="col">Mês</th>
          <th scope="col">Ano</th>
          <th scope="col">Excluir</th>
          <th scope="col">Editar</th>
          <th scope="col">Ver</th>
        </tr>
      </thead>
      <tbody v-for="product in props.array" :key="product.id">
        <tr>
          <th scope="row">{{ product.id }}</th>
          <td>{{ product.nome }}</td>
          <td>R$ {{ product.preco }}</td>
          <td :class="product.tipo === 'saída' ? 'saida' : 'entrada'">{{ product.tipo }}</td>
          <td>{{ product.descricao }}</td>
          <td>{{ product.mes }}</td>
          <td>{{ product.ano }}</td>

          <td>
            <button
              class="btn btn-danger tablebtns"
              v-on:click="
                async () => {
                  await deleteProductById(product.id)
                }
              "
            >
              <i class="bi bi-trash-fill"></i>
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-primary tablebtns"
              data-bs-toggle="modal"
              :data-bs-target="`#edit-modal-${product.id}`"
            >
              <i class="bi bi-pencil-square"></i>
            </button>
            <BaseModalEditProduct :product="product" />
          </td>
          <td>
            <button class="btn btn-success tablebtns">
              <RouterLink class="tableLink" :to="`/despesas/${product.id}`"
                ><i class="bi bi-eye"></i
              ></RouterLink>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
table {
  width: 90%;
  margin: auto;

  tr {
    padding: 0.4rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.164);
  }
  td {
    padding: 0.4rem;
  }

  th {
    padding: 0.4rem;
  }

  .tableLink {
    color: #fff;
    font-size: 1rem;
  }
  .entrada {
    color: lime;
  }

  .saida {
    color: red;
  }
}
</style>
