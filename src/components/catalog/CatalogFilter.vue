<template>
  <div v-if="filterIsOpen" class="catalog__filter-shade" @click="filterIsOpen = false"></div>
  <div class="catalog__filter-container" :style="{ left: filterIsOpen ? '0' : '-100%' }">
    <button type="button" class="catalog__filter-closer" @click="filterIsOpen = false">
      <SvgIcon icon-name="close" />
    </button>
    <h4 class="catalog__filter-title">Подбор по параметрам</h4>
    <div class="catalog__filter">
      <p class="catalog__filter-subtitle">Цена</p>
      <div class="minmax-inputs">
        <input v-model="priceFrom" v-maska="maskaOptions" type="number" class="minmax-input" />
        <div class="delimiter"></div>
        <input v-model="priceTo" v-maska="maskaOptions" type="number" class="minmax-input" />
      </div>
    </div>
    <div v-for="(item, index) in filterItems" :key="index" class="catalog__filter">
      <p class="catalog__filter-subtitle">{{ item.name }}</p>
      <div class="catalog__filter-list" :class="{ 'catalog__filter-list--table': item.type === 'button' }">
        <CatalogCheckbox
          v-for="(value, key) of item.items"
          :key="key"
          :code="item.code"
          :text="value"
          :value="key"
          :type="item.type"
        />
      </div>
    </div>
    <AppButton :disabled="isDisabled" variant="dark" @click="applyFilter"> Применить </AppButton>
    <button :disabled="isDisabled" type="button" class="reset" @click="(resetFilter(), applyFilter())">сбросить</button>
  </div>
</template>

<script lang="ts" setup>
import AppButton from '@/components/ui/AppButton.vue'
import CatalogCheckbox from '@/components/ui/checkbox/CatalogCheckbox.vue'
import SvgIcon from '@/components/ui/SvgIcon.vue'
import { IFilterItem } from '@/interfaces'
import { useFilterStore } from '@/store/filter'
import { useProductsStore } from '@/store/products'
import type { MaskInputOptions } from 'maska'
import { vMaska } from 'maska/vue'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

const maskaOptions = ref<MaskInputOptions>({
  mask: '#',
  tokens: { '#': { pattern: /[0-9]/, repeated: true } },
})

const { genders, brands, sizes, applyFilter } = useProductsStore()
const { filterIsOpen, priceFrom, priceTo, selectedFilter } = storeToRefs(useFilterStore())
const { resetFilter } = useFilterStore()

const filterItems = ref<IFilterItem[]>([])
const makeFilters = () => {
  filterItems.value = [
    {
      name: 'Пол',
      code: 'gender',
      type: 'checkbox',
      items: genders,
    },
    {
      name: 'Бренд',
      code: 'brand',
      type: 'checkbox',
      items: brands.reduce((acc: Record<string, string>, brand) => {
        acc[brand] = brand
        return acc
      }, {}),
    },
    {
      name: 'Размеры',
      code: 'size',
      type: 'button',
      items: sizes.reduce((acc: Record<string, string>, size) => {
        acc[size.toString()] = size.toString()
        return acc
      }, {}),
    },
  ]
}

const isDisabled = computed(() => !priceFrom.value && !priceTo.value && Object.keys(selectedFilter.value).length === 0)

onMounted(() => {
  makeFilters()
})
</script>

<style scoped>
.catalog__filter-closer {
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px;
  width: 40px;
  height: 40px;
  transition: background-color 0.15s;

  svg {
    width: 24px;
    height: 24px;
    fill: var(--gray);
    transition: fill 0.15s;
  }
}

.catalog__filter-shade {
  position: fixed;
  inset: 0;
  background-color: var(--dark-70);
  z-index: 10;
}

.catalog__filter-container {
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: var(--light);
  transition: left 0.15s;

  .button {
    margin-bottom: 8px;
  }
}

.reset {
  font: var(--font-16_400);
  color: var(--dark);
  transition:
    color 0.15s,
    opacity 0.15s;

  &:disabled {
    pointer-events: none;
    opacity: 0;
  }
}

.catalog__filter-title {
  margin-bottom: 24px;
  font: var(--font-24_400);
  color: var(--dark);
}

.catalog__filter {
  margin-bottom: 16px;
}

.catalog__filter-subtitle {
  font: var(--font-16_400);
  color: var(--dark);
  margin-bottom: 8px;
}

.minmax-inputs {
  position: relative;
  display: flex;
  align-items: center;

  .delimiter {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1px;
    height: 32px;
    background-color: var(--beige);
  }
}

.minmax-input {
  padding: 16px 0;
  text-align: center;
  width: 50%;
  font: var(--font-16_400);
  color: var(--dark);
  background-color: transparent;
  border-top: 1px solid var(--beige);
  border-bottom: 1px solid var(--beige);

  &:first-child {
    border-radius: 4px 0 0 4px;
    border-left: 1px solid var(--beige);
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
    border-right: 1px solid var(--beige);
  }
}

.catalog__filter-list:not(.catalog__filter-list--table) {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 104px;
  overflow-y: auto;
  overscroll-behavior: none;

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background-color: var(--beige);
    border-radius: var(--radius);
  }

  &::-webkit-scrollbar-thumb {
    width: 4px;
    height: 4px;
    background-color: var(--dark);
    border-radius: var(--radius);
  }
}

.catalog__filter-list.catalog__filter-list--table {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: relative;
}

@media (any-hover: hover) {
  .reset:hover {
    color: var(--btn-dark-hover);
  }

  .catalog__filter-closer:hover {
    background-color: var(--accent);

    svg {
      fill: var(--white);
    }
  }
}

@media (width <= 1024px) {
  .catalog__filter-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: -100%;
    z-index: 15;
    width: 280px;
    overflow-y: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
