<script setup>
import { reactive } from 'vue'
import { useProductsStore } from '@/stores/products.js'
import BaseTeste from './BaseTeste.vue'
import BaseSelect from './BaseSelect.vue'
const productsStore = useProductsStore()

const { createProduct } = productsStore

const product = reactive({
  nome: '',
  preco: 0,
  tipo: '',
  descricao: '',
  mes: '',
  ano: ''
})

const descriptionOptions = ['Alimentação', 'Lazer', 'Contas', 'Carro', 'Outros']
const typeOptions = ['Entrada', 'saída']

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
const onSubmit = (ev) => {
  ev.preventDefault()
  if (
    !product.nome ||
    product.preco === 0 ||
    !product.tipo ||
    !product.descricao ||
    !product.mes ||
    !product.ano
  ) {
    alert('Preencha todos os campos corretamente')
  } else {
    createProduct(product)
    console.log(product)
  }

  ;(product.nome = ''),
    (product.preco = 0),
    (product.tipo = ''),
    (product.descricao = ''),
    (product.mes = 0),
    (product.ano = '')
}
</script>

<template>
  <div
    class="modal fade"
    id="create-modal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Listar Despesa</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form @submit="onSubmit">
          <div class="modal-body">
            <BaseTeste
              class="mb-1"
              name="Nome"
              type="text"
              :first-value="product.nome"
              @atualizado="(e) => (product.nome = e)"
            ></BaseTeste>

            <BaseTeste
              class="mb-1"
              name="Preço"
              type="number"
              :first-value="product.preco"
              @atualizado="(e) => (product.preco = parseFloat(e))"
            ></BaseTeste>
            <BaseSelect
              name="Tipo"
              :options="typeOptions"
              :first-value="product.tipo"
              @atualizado="(e) => (product.tipo = e)"
            ></BaseSelect>
            <BaseSelect
              name="Descrição"
              :options="descriptionOptions"
              :first-value="product.descricao"
              @atualizado="(e) => (product.descricao = e)"
            ></BaseSelect>
            <BaseSelect
              name="Mês"
              :options="monthOptions"
              :first-value="product.mes"
              @atualizado="(e) => (product.mes = e)"
            ></BaseSelect>
            <BaseTeste
              name="Ano"
              type="text"
              :first-value="product.ano"
              @atualizado="(e) => (product.ano = e)"
            ></BaseTeste>
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
