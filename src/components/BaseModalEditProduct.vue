<script setup>
import { reactive, ref } from 'vue'
import BaseTeste from './BaseTeste.vue'
import BaseSelect from './BaseSelect.vue'
import { useProductsStore } from '@/stores/products'
const props = defineProps({
  product: Object
})

const productStore = useProductsStore()

const { editProduct } = productStore
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

const newProduct = reactive({
  nome: props.product.nome,
  preco: props.product.preco,
  tipo: props.product.tipo,
  descricao: props.product.descricao,
  mes: props.product.mes,
  ano: props.product.ano
})

const editProductById = async () => {
  if (
    !newProduct.nome ||
    newProduct.preco === 0 ||
    !newProduct.tipo ||
    !newProduct.descricao ||
    !newProduct.mes ||
    !newProduct.ano
  ) {
    alert('Preencha os campos corretamente')
  } else {
    try {
      await editProduct(props.product.id, newProduct)
      console.log(newProduct)
    } catch (error) {
      console.log('erro ao editar produto: ', error)
    }
  }
}
</script>

<template>
  <div
    class="modal fade"
    :id="`edit-modal-${product.id}`"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Editar</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <BaseTeste
            class="mb-1"
            name="Nome"
            type="text"
            :first-value="newProduct.nome"
            @atualizado="(e) => (newProduct.nome = e)"
          ></BaseTeste>

          <BaseTeste
            class="mb-1"
            name="Preço"
            type="number"
            :first-value="newProduct.preco"
            @atualizado="(e) => (newProduct.preco = parseFloat(e))"
          ></BaseTeste>
          <BaseSelect
            name="Tipo"
            :options="typeOptions"
            :first-value="newProduct.tipo"
            @atualizado="(e) => (newProduct.tipo = e)"
          ></BaseSelect>
          <BaseSelect
            name="Descrição"
            :options="descriptionOptions"
            :first-value="newProduct.descricao"
            @atualizado="(e) => (newProduct.descricao = e)"
          ></BaseSelect>
          <BaseSelect
            name="Mês"
            :options="monthOptions"
            :first-value="newProduct.mes"
            @atualizado="(e) => (newProduct.mes = e)"
          ></BaseSelect>
          <BaseTeste
            name="Ano"
            type="text"
            :first-value="newProduct.ano"
            @atualizado="(e) => (newProduct.ano = e)"
          ></BaseTeste>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="editProductById()"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
