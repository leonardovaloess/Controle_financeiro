export default (httpClient) => ({
  getProducts: () => {
    return httpClient.get('/products')
  },
  getOneProduct: (id) => {
    return httpClient.get(`/products/${id}`)
  },
  createProduct: (product) => {
    return httpClient.post('/products', product)
  },
  deleteProduct: (id) => {
    return httpClient.delete(`/products/${id}`)
  },
  editProduct: (id, data) => {
    return httpClient.put(`/products/${id}`, data)
  }
})
