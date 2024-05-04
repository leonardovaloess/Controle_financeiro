<script setup>
import BaseGraph from '@/components/BaseGraph.vue'
import { useProductsStore } from '@/stores/products'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const productStore = useProductsStore()

const { getProducts } = productStore
const { productsArr } = storeToRefs(productStore)

const productsArrPriceOrder = ref([])

const chartDataPrice = ref({})
const chartDataMonths = ref({})

const chartOptions = {
  responsive: true
}

const initGraphs = () => {
  productsArrPriceOrder.value = [...productsArr.value].sort((a, b) => a.preco - b.preco)

  const labelsPrice = productsArrPriceOrder.value.map((product) => product.nome)

  chartDataPrice.value = {
    labels: labelsPrice,
    datasets: [
      {
        label: 'Preço (menor - maior)',
        backgroundColor: 'rgba(0, 233, 0, 0.31)',
        data: productsArrPriceOrder.value.map((product) => product.preco)
      }
    ]
  }

  // Agrupar os produtos filtrados por mês e somar os preços
  const dataByMonth = {}
  productsArr.value.forEach((product) => {
    const month = product.mes
    const price = product.preco
    const type = product.tipo

    // Inicializar o objeto para o mês, se ainda não estiver presente
    if (!dataByMonth[month]) {
      dataByMonth[month] = { Entrada: 0, saída: 0 }
    }

    // Incrementar o preço correspondente ao tipo de produto (Entrada ou Saída)
    dataByMonth[month][type] += price
  })

  // Criar os rótulos e dados do gráfico
  const sortedMonths = Object.keys(dataByMonth).sort((a, b) => {
    const monthsOrder = {
      Janeiro: 1,
      Fevereiro: 2,
      Março: 3,
      Abril: 4,
      Maio: 5,
      Junho: 6,
      Julho: 7,
      Agosto: 8,
      Setembro: 9,
      Outubro: 10,
      Novembro: 11,
      Dezembro: 12
    }
    return monthsOrder[a] - monthsOrder[b]
  })

  const datasets = Object.keys(dataByMonth[sortedMonths[0]]).map((type) => {
    return {
      label: type,
      backgroundColor: type === 'Entrada' ? 'rgba(0, 233, 0, 0.31)' : 'rgba(255, 0, 0, 0.336)',
      data: sortedMonths.map((month) => dataByMonth[month][type])
    }
  })

  // Passar os dados para o componente do gráfico
  chartDataMonths.value = {
    labels: sortedMonths,
    datasets: datasets
  }
}

onMounted(async () => {
  await getProducts()

  initGraphs()
})
</script>

<template>
  <div class="dashboard-container">
    <div class="graphs-container">
      <div v-if="productsArrPriceOrder.length > 0">
        <div>
          <h2 class="mb-5">Entradas / Saídas Mensais</h2>
          <BaseGraph :chartData="chartDataMonths" :chartOptions="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;

  .graphs-container {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    justify-content: center;
    gap: 5rem;
    width: 100%;

    div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
}
</style>
