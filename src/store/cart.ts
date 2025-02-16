import { ICartProduct, IProduct } from '@/interfaces'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cartList = ref<ICartProduct[]>([])

  const addToCart = (item: IProduct, size: number) => {
    const { id, article, imageUrl, name, price, oldPrice, discount } = item
    const cartItem: ICartProduct = {
      id,
      article,
      imageUrl: imageUrl[0],
      name,
      price,
      oldPrice,
      discount,
      currentSize: size,
    }

    cartList.value.push(cartItem)
  }

  const removeFromCart = (item: ICartProduct) => {
    cartList.value.splice(cartList.value.indexOf(item), 1)
  }

  const totalPrice = computed(() => cartList.value.reduce((acc, item) => acc + item.price, 0))

  watch(cartList, () => localStorage.setItem('cart', JSON.stringify(cartList.value)), { deep: true })

  const localCart = localStorage.getItem('cart')
  cartList.value = localCart ? JSON.parse(localCart) : []

  return {
    cartList,
    addToCart,
    removeFromCart,
    totalPrice,
  }
})
