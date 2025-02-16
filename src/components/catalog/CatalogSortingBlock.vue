<template>
  <div class="catalog__sorting-block grid">
    <div class="catalog__sorting-block-container">
      <button type="button" class="catalog__filter-opener" @click="filterIsOpen = true">
        <SvgIcon icon-name="filter" />
      </button>
      <div class="catalog__select">
        <div class="catalog__select-title" @click="selectIsOpen = !selectIsOpen">{{ selectTitle }}</div>
        <div v-show="selectIsOpen" class="catalog__select-options">
          <div
            v-for="(item, index) in select"
            :key="index"
            class="catalog__select-option"
            @click="((selectIsOpen = false), (sortBy = item.value), applyFilter())"
          >
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
    <input
      class="catalog__search"
      type="text"
      placeholder="Поиск..."
      :value="searchQuery"
      @input="onChangeSearchInput"
    />
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/ui/SvgIcon.vue'
import { useFilterStore } from '@/store/filter'
import { useProductsStore } from '@/store/products'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const selectIsOpen = ref(false)
const { filterIsOpen } = storeToRefs(useFilterStore())

const select = [
  {
    text: 'По названию',
    value: 'name',
  },
  {
    text: 'Цена по возрастанию',
    value: 'price',
  },
  {
    text: 'Цена по убыванию',
    value: '-price',
  },
]

const { sortBy, searchQuery } = storeToRefs(useFilterStore())
const { applyFilter } = useProductsStore()

const selectTitle = computed(() => {
  return select.find((item) => item.value === sortBy.value)?.text
})

let timeout: ReturnType<typeof setTimeout>

const onChangeSearchInput = (e: Event) => {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    searchQuery.value = (e.target as HTMLInputElement).value.trim()
    applyFilter()
  }, 500)
}
</script>

<style scoped>
.catalog__filter-opener {
  display: none;
  align-items: center;
  justify-content: center;
  padding: 0 11.2px;
  border: 1px solid var(--beige);
  border-radius: 4px;

  svg {
    width: 32px;
    height: 32px;
    fill: var(--dark);
  }
}

.catalog__sorting-block {
  grid-column: span 12;
  margin-bottom: 24px;
}

.catalog__sorting-block-container {
  grid-column: span 3;
  display: flex;
  gap: 16px;
}

.catalog__select {
  flex-grow: 1;
  position: relative;
  font: var(--font-16_400);
  border: 1px solid var(--beige);
  border-radius: 4px;
  color: var(--dark);
}

.catalog__select-title {
  padding: 16px;
  background-color: var(--light);
}

.catalog__select-option {
  padding: 16px;
}

.catalog__select-title,
.catalog__select-option {
  cursor: pointer;
  transition: background-color 0.15s;
}

.catalog__select-options {
  position: absolute;
  top: calc(100% - 2px);
  left: -1px;
  right: -1px;
  display: flex;
  flex-direction: column;
  background-color: var(--light);
  border: 1px solid var(--beige);
  border-radius: 0 0 4px 4px;
  z-index: 1;
}

.catalog__search {
  grid-column: span 9;
  padding: 16px;
  font: var(--font-16_400);
  color: var(--dark);
  border: 1px solid var(--beige);
  border-radius: 4px;
}

@media (any-hover: hover) {
  .catalog__select-option:hover,
  .catalog__select-title:hover {
    background-color: var(--light-beige);
  }
}

@media (width <= 1024px) {
  .catalog__sorting-block {
    grid-column: span 6;
  }

  .catalog__sorting-block-container {
    grid-column: span 2;
    gap: 8px;
  }

  .catalog__filter-opener {
    padding: 0 7.8px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .catalog__select {
    font: var(--font-14_400);
  }

  .catalog__select-title,
  .catalog__select-option {
    padding: 8px;
  }

  .catalog__search {
    padding: 6px 8px;
    grid-column: span 4;
  }

  .catalog__filter-opener {
    display: flex;
  }
}

@media (width <= 768px) {
  .catalog__sorting-block {
    grid-column: span 6;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px 20px;
  }

  .catalog__sorting-block-container,
  .catalog__search {
    grid-column: span 2;
  }
}

@media (width <= 576px) {
  .catalog__sorting-block {
    grid-column: span 2;
  }
}
</style>
