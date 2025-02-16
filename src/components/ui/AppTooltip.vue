<template>
  <div :class="['tooltip', { 'tooltip-is-open': tooltipIsOpen }]">
    <button ref="tooltipButton" type="button" class="tooltip__button" @click="tooltipIsOpen = !tooltipIsOpen">?</button>
    <div ref="tooltipBody" class="tooltip__body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tooltipIsOpen = ref(false)
const tooltipButton = ref()
const tooltipBody = ref()

document.addEventListener('click', (event) => {
  if (
    tooltipIsOpen.value &&
    !event.composedPath().includes(tooltipButton.value) &&
    !event.composedPath().includes(tooltipBody.value)
  ) {
    tooltipIsOpen.value = false
  }
})
</script>

<style scoped>
.tooltip {
  position: relative;
  font: var(--font-14_400);
  color: var(--dark);
}

.tooltip.tooltip-is-open {
  .tooltip__body {
    opacity: 1;
    visibility: visible;
  }
}

.tooltip__button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-color: var(--white);
  border-radius: 50%;
  box-shadow: 2px 4px 10px 0 rgba(0, 13, 84, 0.2);
}

.tooltip__body {
  position: absolute;
  left: -56px;
  bottom: calc(100% + 16px);
  width: 400px;
  padding: 8px 16px;
  background-color: var(--white);
  box-shadow: 4px 8px 20px 0 rgba(0, 13, 84, 0.2);
  border-radius: 8px;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.15s,
    visibility 0.15s;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 58px;
    width: 16px;
    height: 16px;
    border-radius: 0 0 4px 0;
    transform: rotate(45deg);
    background-color: var(--white);
  }
}
</style>
