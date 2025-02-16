import { PRODUCTS_URL } from '@/constants/api'
import { IProduct } from '@/interfaces'
import axios from 'axios'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useFilterStore } from './filter'

export const useProductsStore = defineStore('products', () => {
  const genders = {
    male: 'Мужской',
    female: 'Женский',
    unisex: 'Унисекс',
  }
  const brands = ['adidas Originals', 'Diadora', 'New Balance', 'Nike', 'Puma', 'Reebok']
  const sizes = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
  const products = ref<IProduct[]>([])

  const { sortBy, searchQuery, priceFrom, priceTo, selectedFilter } = storeToRefs(useFilterStore())

  const currentPage = ref(1)
  const maxPages = ref(1)

  const isLoading = ref(false)

  const createParams = () => {
    const params: Record<string, string | string[] | number> = {
      sortBy: sortBy.value,
      page: currentPage.value,
      limit: 9,
    }

    if (searchQuery.value) {
      params.name = `*${searchQuery.value}*`
    }

    if (priceFrom.value) {
      params['price[from]'] = priceFrom.value
    }

    if (priceTo.value) {
      params['price[to]'] = priceTo.value
    }

    for (const code in selectedFilter.value) {
      if (code !== 'size') {
        params[code] = selectedFilter.value[code]
      }
    }

    return params
  }

  const filteredProductsBySize = (items: IProduct[]) => {
    const selectedSizes = selectedFilter.value.size.map((size) => Number(size))
    return items.filter((item: IProduct) => {
      return item.sizes.some((sizeObj) => selectedSizes.includes(sizeObj.size) && sizeObj.qnt > 0)
    })
  }

  const applyFilter = () => {
    products.value = []
    currentPage.value = 1
    getProducts()
  }

  const getProducts = async () => {
    try {
      isLoading.value = true

      const data = await axios.get(`${PRODUCTS_URL}`, { params: createParams() })

      const dataItems = data.data.items

      if ('size' in selectedFilter.value && selectedFilter.value.size.length > 0) {
        const processedProducts = filteredProductsBySize(dataItems)
        for (const item of processedProducts) {
          products.value.push(item)
        }
      } else {
        for (const item of dataItems) {
          products.value.push(item)
        }
      }

      maxPages.value = data.data.meta.total_pages
      currentPage.value += 1
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    products,
    genders,
    brands,
    sizes,
    currentPage,
    maxPages,
    isLoading,
    getProducts,
    applyFilter,
  }
})
