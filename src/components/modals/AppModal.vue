<template>
  <div v-if="modalProduct" class="modal">
    <div class="modal__top">
      <p class="modal__title">Подробно о товаре</p>
      <button type="button" class="modal__closer" @click="closeModal">
        <SvgIcon icon-name="close" />
      </button>
    </div>
    <div class="modal__content">
      <div class="modal__image">
        <swiper-container class="swiper-main" v-bind="mainSwiperParams">
          <swiper-slide v-for="(image, index) in modalProduct.imageUrl" :key="index" class="swiper-main__slide">
            <img :src="image" :alt="modalProduct.name" class="image" loading="lazy" />
            <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </swiper-slide>
        </swiper-container>
        <swiper-container class="swiper-thumbs" v-bind="thumbsSwiperParams">
          <swiper-slide v-for="(image, index) in modalProduct.imageUrl" :key="index" class="swiper-thumbs__slide">
            <img :src="image" :alt="modalProduct.name" class="image" loading="lazy" />
          </swiper-slide>
        </swiper-container>
      </div>
      <div class="modal__info">
        <div class="modal__badges">
          <div class="modal__article">
            Артикул: <span>{{ modalProduct.article }}</span>
          </div>
          <div class="modal__qnt">
            Количество: <span>{{ productSizes[currentSize] ?? '-' }} шт.</span>
          </div>
        </div>
        <h4 class="modal__name">{{ modalProduct.name }}</h4>
        <p class="modal__sizes-text">Выберите размер</p>
        <div class="modal__sizes">
          <button
            v-for="(size, index) in sizes"
            :key="index"
            type="button"
            :class="[
              'modal__size',
              { disabled: !(size in productSizes && productSizes[size] > 0), active: currentSize === size },
            ]"
            @click="currentSize = size"
          >
            {{ size }}
          </button>
        </div>
        <div class="modal__price-container">
          <div :class="['modal__price', { 'modal__price--discount': modalProduct.discount }]">
            {{ formatCurrency(modalProduct.price) }}
          </div>
          <div v-if="modalProduct.oldPrice" class="modal__price-old">{{ formatCurrency(modalProduct.oldPrice) }}</div>
        </div>
        <AppButton
          :disabled="!currentSize"
          variant="accent"
          @click="(addToCart(modalProduct, currentSize), showNotification('Товар добавлен в корзину!'))"
        >
          Заказать
        </AppButton>
        <div class="modal__benefits">
          <div v-for="(benefit, index) in benefits" :key="index" class="modal__benefit">
            <SvgIcon icon-name="check" />
            {{ benefit }}
          </div>
        </div>
      </div>
      <div class="modal__description">
        <h3 class="modal__description-title">Описание</h3>
        <p class="modal__description-text">{{ modalProduct.description }}</p>
      </div>
      <div class="modal__chars">
        <h3 class="modal__chars-title">Характеристики</h3>
        <ul class="modal__chars-list">
          <li v-for="(char, index) in chars" :key="index" class="modal__chars-item">
            {{ char }}: {{ productChars[index] }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppButton from '@/components/ui/AppButton.vue'
import SvgIcon from '@/components/ui/SvgIcon.vue'
import { useCartStore } from '@/store/cart'
import { useModalStore } from '@/store/modal'
import { useProductsStore } from '@/store/products'
import { showNotification } from '@/utils/notifications'
import { formatCurrency } from '@/utils/utils'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const { sizes } = useProductsStore()

const { modalPayload: modalProduct } = storeToRefs(useModalStore())
const { closeModal } = useModalStore()

const productSizes = computed(() => {
  const result: Record<number, number> = {}

  for (const sizeData of modalProduct.value?.sizes ?? []) {
    result[sizeData.size] = sizeData.qnt
  }

  return result
})

const currentSize = ref(0)

const { addToCart } = useCartStore()

const benefits = ['Бесплатная доставка до двери', 'Оплата заказа при получении', 'Обмен в течении двух недель']

const chars = ['Пол', 'Цвет', 'Материалы', 'Страна производства']
const genders = {
  male: 'Мужской',
  female: 'Женский',
  unisex: 'Унисекс',
}
const productChars = [
  genders[modalProduct.value?.gender as keyof typeof genders],
  modalProduct.value?.color,
  modalProduct.value?.materials,
  modalProduct.value?.country,
]

/* Свайпер (START) */
import { register } from 'swiper/element/bundle'
import { SwiperOptions } from 'swiper/types'

const mainSwiperParams: SwiperOptions = {
  spaceBetween: 16,
  thumbs: { swiper: '.swiper-thumbs' },
}

const thumbsSwiperParams: SwiperOptions = {
  slidesPerView: 4,
  spaceBetween: 16,
  watchSlidesProgress: true,
}

register()
/* Свайпер (END) */
</script>

<style scoped>
.swiper-main__slide,
.swiper-thumbs__slide {
  aspect-ratio: 1 / 1;
}

.swiper-main {
  margin-bottom: 16px;
}

.swiper-main__slide {
  cursor: grab;
}

.swiper-thumbs__slide {
  border-radius: var(--radius);
  border: 1px solid transparent;
  overflow: hidden;
  transition: border-color 0.15s;
  cursor: pointer;
}

.swiper-slide-thumb-active {
  border-color: var(--dark);
}

.modal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, calc(-50% - 24px));
  width: 980px;
  max-height: calc(100dvh - 48px);
  margin: 24px 0;
  background-color: var(--white);
  z-index: 15;
}

.modal__top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.modal__title {
  display: none;
  padding-left: 8px;
  font: var(--font-16_700);
  color: var(--dark);
}

.modal__closer {
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

.modal__content {
  display: grid;
  grid-template-columns: repeat(2, calc(50% - 10px));
  align-content: flex-start;
  column-gap: 20px;
  row-gap: 48px;
  padding: 40px;
  max-height: inherit;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background-color: var(--gray);
  }

  &::-webkit-scrollbar-thumb {
    width: 4px;
    height: 4px;
    background-color: var(--dark);
    border-radius: var(--radius);
  }

  .button {
    width: 75%;
  }
}

.modal__image,
.modal__info,
.modal__description,
.modal__chars {
  grid-column: span 1;
}

.modal__badges,
.modal__price-container,
.modal__sizes,
.modal__benefit {
  display: flex;
  align-items: center;
}

.modal__name,
.modal__sizes-text,
.modal__size,
.modal__price,
.modal__description-title,
.modal__chars-title,
.modal__description-text,
.modal__chars-item {
  color: var(--dark);
}

.modal__article,
.modal__qnt,
.modal__sizes-text {
  font: var(--font-16_400);
}

.modal__badges {
  justify-content: space-between;
  margin-bottom: 16px;
}

.modal__article,
.modal__qnt {
  white-space: nowrap;
  color: var(--gray);
}

.modal__name {
  font: var(--font-24_400);
  margin-bottom: 24px;
}

.modal__sizes-text {
  margin-bottom: 8px;
}

.modal__sizes {
  gap: 16px 24px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.modal__size {
  padding: 8px 24px;
  font: var(--font-14_400);
  border-radius: var(--radius);
  border: 1px solid var(--gray);
}

.modal__size.disabled {
  opacity: 0.6;
  cursor: default;
  pointer-events: none;
}

.modal__size.active {
  border-color: var(--dark);
}

.modal__price-container {
  gap: 32px;
  margin-bottom: 16px;
}

.modal__price {
  font: var(--font-30_700);
}

.modal__price.modal__price--discount {
  color: var(--accent);
}

.modal__price-old {
  font: var(--font-16_400);
  color: var(--gray);
  text-decoration: line-through;
}

.modal__benefits,
.modal__chars-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.modal__benefits {
  margin-top: 24px;
}

.modal__benefit {
  gap: 8px;
  font: var(--font-14_400);
  color: var(--gray);

  svg {
    width: 16px;
    height: 16px;
    fill: var(--gray);
  }
}

.modal__description-title,
.modal__chars-title {
  margin-bottom: 8px;
}

.modal__description-text {
  max-height: 112px;
  overflow-y: auto;
  padding-right: 16px;

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background-color: var(--gray);
    border-radius: var(--radius);
  }

  &::-webkit-scrollbar-thumb {
    width: 4px;
    height: 4px;
    background-color: var(--dark);
    border-radius: var(--radius);
  }
}

@media (any-hover: hover) {
  .modal__closer:hover {
    background-color: var(--accent);

    svg {
      fill: var(--white);
    }
  }
}

@media (width <= 1024px) {
  .modal {
    inset: 0;
    transform: none;
    width: 100%;
    height: 100%;
    max-height: 100%;
    margin: 0;
  }
}

@media (width <= 768px) {
  .modal__content {
    grid-template-columns: repeat(1, 100%);
  }
}

@media (width <= 576px) {
  .modal__top {
    justify-content: space-between;
    box-shadow: 0 4px 16px 0 var(--dark-70);
    z-index: 5;
    background-color: var(--white);
  }

  .modal__title {
    display: block;
  }

  .modal__content {
    margin-top: 40px;
    padding: 0 20px 20px;
    row-gap: 24px;
    max-height: calc(100% - 40px);
  }

  .modal__price-container {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 8px;
  }

  .modal__sizes {
    gap: 8px 12px;
  }
}
</style>
