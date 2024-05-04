import axios from 'axios'

import ProjectsService from '@/api/services/products'

const baseURL = 'http://localhost:3000'

const httpClient = axios.create({ baseURL })

export default {
  products: ProjectsService(httpClient)
}
