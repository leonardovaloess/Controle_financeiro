// import api from '@/api/index.js'

import api from '@/api'
import { defineStore } from 'pinia'

export const useProductsStore = defineStore({
  id: 'products',

  state: () => ({
    productsArr: [],
    actualProduct: {}
  }),

  actions: {
    async getProducts() {
      try {
        const res = await api.products.getProducts()
        this.productsArr = res.data
        return res
      } catch (error) {
        console.log('Erro ao fazer get. ', error)
      }
    },

    async createProduct(product) {
      try {
        await api.products.createProduct(product)
        await this.getProducts()
      } catch (error) {
        console.log('Erro ao criar produto: ', error)
      }
    },

    async deleteProduct(id) {
      try {
        await api.products.deleteProduct(id)
        await this.getProducts()
      } catch (error) {
        console.log('Erro ao deletar produto: ', error)
      }
    },

    async editProduct(id, newProduct) {
      try {
        await api.products.editProduct(id, newProduct)
        await this.getProducts()
      } catch (error) {
        console.log('Erro ao editar produto: ', error)
      }
    },

    async getOneProduct(id) {
      try {
        const res = await api.products.getOneProduct(id)
        this.actualProduct = res
      } catch (error) {
        console.log('Erro ao chamar produto: ', error)
      }
    }
  }
})
