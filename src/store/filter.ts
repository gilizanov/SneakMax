import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useFilterStore = defineStore('filter', () => {
  const filterIsOpen = ref(false)
  const sortBy = ref('name')
  const searchQuery = ref('')
  const priceFrom = ref<number | undefined>()
  const priceTo = ref<number | undefined>()
  const selectedFilter = ref<Record<string, string[]>>({})

  const resetFilter = () => {
    sortBy.value = 'name'
    searchQuery.value = ''
    priceFrom.value = undefined
    priceTo.value = undefined
    selectedFilter.value = {}
  }

  watch(
    [sortBy, searchQuery, priceFrom, priceTo, selectedFilter],
    () => {
      localStorage.setItem(
        'filter',
        JSON.stringify({
          sortBy: sortBy.value,
          searchQuery: searchQuery.value,
          priceFrom: priceFrom.value,
          priceTo: priceTo.value,
          selectedFilter: selectedFilter.value,
        }),
      )
    },
    { deep: true },
  )

  const localFilter = localStorage.getItem('filter')

  if (localFilter) {
    sortBy.value = JSON.parse(localFilter).sortBy
    searchQuery.value = JSON.parse(localFilter).searchQuery
    priceFrom.value = JSON.parse(localFilter).priceFrom
    priceTo.value = JSON.parse(localFilter).priceTo
    selectedFilter.value = JSON.parse(localFilter).selectedFilter
  }

  return {
    filterIsOpen,
    sortBy,
    searchQuery,
    priceFrom,
    priceTo,
    selectedFilter,
    resetFilter,
  }
})
