<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  name: String,
  type: String,
  firstValue: [String, Number]
})
</script>

<template>
  <div class="input-container">
    <label>{{ props.name }}</label>
    <input
      class="mt-2 p-2 mb-2"
      :type="props.type"
      :value="props.firstValue"
      @input="$emit('atualizado', $event.target.value)"
      v-bind="$attrs"
    />
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
}
input {
  padding: 0.4rem;
}
</style>
