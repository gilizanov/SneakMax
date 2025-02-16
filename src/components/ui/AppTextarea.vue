<template>
  <textarea v-model="userMessage" class="textarea"></textarea>
</template>

<script lang="ts" setup>
const userMessage = defineModel<string>({ required: false })
</script>

<style scoped>
.textarea {
  padding: 24px;
  resize: none;
  max-width: 800px;
  width: 100%;
  height: 320px;
  font: var(--font-24_400);
  background-color: var(--white);
  border: 1px solid transparent;
  border-radius: var(--radius);
  color: var(--dark);
  transition: border-color 0.4s;

  &:focus {
    border-color: var(--dark);
  }
}

@media (width <= 1024px) {
  .textarea {
    font: var(--font-16_400);
  }
}
</style>
