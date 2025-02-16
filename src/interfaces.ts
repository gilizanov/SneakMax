export interface IProduct {
  id: number
  article: string
  imageUrl: string[]
  brand: string
  name: string
  price: number
  oldPrice?: number
  discount: boolean
  sizes: TypeSizes[]
  gender: 'male' | 'female' | 'unisex'
  color: string
  materials: string
  country: string
  description: string
}

type TypeSizes = {
  size: number
  qnt: number
}

export interface ICartProduct {
  id: number
  article: string
  imageUrl: string
  name: string
  price: number
  oldPrice?: number
  discount: boolean
  currentSize: number
}

export interface IFilterItem {
  name: string
  code: string
  type: 'checkbox' | 'button'
  items: Record<string, string>
}

export type TypeFaqItem = {
  id: number
  title: string
  content: string
}
