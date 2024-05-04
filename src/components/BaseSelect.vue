<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  name: String,
  firstValue: String,
  options: Array
})
</script>

<template>
  <div class="input-container">
    <label :for="`${props.name}-select`">{{ props.name }}</label>
    <select
      class="mt-2 mb-2"
      :value="props.firstValue"
      @input="$emit('atualizado', $event.target.value)"
      v-bind="$attrs"
    >
      <option disabled selected value="">Escolha uma opção</option>
      <option v-for="option in props.options" :key="option" :value="option">{{ option }}</option>
    </select>
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
}

select {
  padding: 0.8rem;
}
</style>
