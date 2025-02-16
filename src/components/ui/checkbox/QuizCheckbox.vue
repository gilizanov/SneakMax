<template>
  <label class="checkbox">
    <input type="checkbox" class="checkbox__input" @change="change(($event.target as HTMLInputElement).checked)" />
    <span class="checkbox__icon">
      <SvgIcon icon-name="check" />
    </span>
    <span class="checkbox__text">{{ text }}</span>
  </label>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/ui/SvgIcon.vue'

const props = defineProps<{
  text: string
  value: string
}>()

const variants = defineModel<string[]>({ required: false })

const change = (val: boolean) => {
  if (val) {
    variants.value?.push(props.value ?? '')
  } else {
    variants.value = variants.value?.filter((v) => v !== props.value)
  }
}
</script>
