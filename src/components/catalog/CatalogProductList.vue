<template>
  <div v-if="products.length === 0 && !isLoading" class="empty-list">
    <p class="empty-list__text">По вашему запросу ничего не найдено :(</p>
  </div>
  <div class="product-list">
    <div
      v-for="productItem in products"
      :key="productItem.id"
      class="product-card"
      @click="openModal('Modal', productItem)"
    >
      <div class="product-card__image">
        <picture>
          <img loading="lazy" :src="productItem.imageUrl[0]" class="image" :alt="productItem.name" />
        </picture>
        <button type="button" class="product-card__button" @click="openModal('Modal', productItem)">
          <SvgIcon icon-name="show" />
        </button>
      </div>
      <h4 class="product-card__name">{{ productItem.name }}</h4>
      <div class="product-card__price-container">
        <div :class="['product-card__price', { 'product-card__price--discount': productItem.discount }]">
          {{ formatCurrency(productItem.price) }}
        </div>
        <div v-if="productItem.discount && productItem.oldPrice !== undefined" class="product-card__price-old">
          {{ formatCurrency(productItem.oldPrice) }}
        </div>
      </div>
    </div>
    <AppButton v-if="currentPage <= maxPages && !isLoading" variant="accent" @click="getProducts"
      >Показать еще</AppButton
    >
  </div>
</template>

<script lang="ts" setup>
import AppButton from '@/components/ui/AppButton.vue'
import SvgIcon from '@/components/ui/SvgIcon.vue'
import { useModalStore } from '@/store/modal'
import { useProductsStore } from '@/store/products'
import { formatCurrency } from '@/utils/utils'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const { products, currentPage, maxPages, isLoading } = storeToRefs(useProductsStore())
const { getProducts } = useProductsStore()

onMounted(() => getProducts())

const { openModal } = useModalStore()
</script>

<style scoped>
.empty-list {
  grid-column: span 9;
}

.empty-list__text {
  font: var(--font-30_700);
  text-align: center;
  color: var(--dark);
}

.product-list {
  grid-column: span 9;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 20px;

  .button {
    grid-column: span 9;
    margin: 20px auto 0;
  }
}

.product-card {
  grid-column: span 3;
  display: flex;
  flex-direction: column;
}

.product-card__image {
  position: relative;
  margin-bottom: 8px;
  aspect-ratio: 1 / 1;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: var(--white-hover);
    opacity: 0;
    transition: opacity 0.15s;
  }
}

.product-card__name {
  margin-bottom: 4px;
  font: var(--font-16_400);
  color: var(--dark);
}

.product-card__price-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.product-card__price {
  font: var(--font-20_700);
  color: var(--dark);
}

.product-card__price.product-card__price--discount {
  color: var(--accent);
}

.product-card__price-old {
  font: var(--font-14_400);
  text-decoration: line-through;
  color: var(--gray);
}

.product-card__button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background-color: var(--dark);
  border-radius: 50%;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.15s,
    visibility 0.15s,
    background-color 0.15s;
  z-index: 1;

  &:active {
    background-color: var(--btn-dark-active);
  }

  svg {
    fill: var(--white);
    width: 32px;
    height: 32px;
  }
}

@media (any-hover: hover) {
  .product-card:hover {
    .product-card__button {
      opacity: 1;
      visibility: visible;
    }

    .product-card__image::after {
      opacity: 1;
    }
  }

  .product-card__button:hover {
    background-color: var(--btn-dark-hover);
  }
}

@media (width <= 1024px) {
  .product-list {
    grid-column: span 6;
  }

  .product-card__price-container {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
}

@media (width <= 576px) {
  .product-list {
    grid-column: span 2;
    grid-template-columns: repeat(2, 1fr);

    .button {
      grid-column: span 2;
    }
  }

  .product-card {
    grid-column: span 1;
  }
}
</style>
