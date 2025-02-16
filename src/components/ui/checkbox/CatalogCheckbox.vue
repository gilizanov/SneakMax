<template>
  <label :class="['checkbox', { 'checkbox--button': type === 'button' }]">
    <input
      type="checkbox"
      class="checkbox__input"
      :checked="selectedFilter[code]?.includes(value)"
      @change="change(($event.target as HTMLInputElement).checked)"
    />
    <span v-if="type === 'checkbox'" class="checkbox__icon">
      <SvgIcon icon-name="check" />
    </span>
    <span class="checkbox__text">{{ text }}</span>
  </label>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/ui/SvgIcon.vue'
import { useFilterStore } from '@/store/filter'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  code: string
  text: string
  value: string
  type: 'checkbox' | 'button'
}>()

const { selectedFilter } = storeToRefs(useFilterStore())

const change = (val: boolean) => {
  if (!(props.code in selectedFilter.value)) {
    selectedFilter.value[props.code] = []
  }

  if (val) {
    selectedFilter.value[props.code].push(props.value)
  } else {
    selectedFilter.value[props.code] = selectedFilter.value[props.code].filter((v) => v !== props.value)
  }

  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  if (selectedFilter.value[props.code].length === 0) delete selectedFilter.value[props.code]
}
</script>
