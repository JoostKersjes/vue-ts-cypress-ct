<script setup lang="ts">
defineProps<{
  msg: string
}>()
const emit = defineEmits<{
  (e: "poke"): void
}>()
</script>

<template>
  <h1>{{ msg }}</h1>
  <button @click="emit('poke')">
    <slot>Poke me!</slot>
  </button>
</template>

<style scoped>
h1 {
  font-size: 2rem;
}
</style>
