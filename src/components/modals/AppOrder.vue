<template>
  <div class="order">
    <div class="order__top">
      <h3 class="order__title">Оформление заказа</h3>
      <button type="button" class="order__closer" @click="closeModal">
        <SvgIcon icon-name="close" />
      </button>
    </div>
    <div class="order__content">
      <div class="order__detail">
        <div class="order__detail-list">
          <div class="order__detail-item">
            Заказ: <span>{{ orderNumber }}</span>
          </div>
          <div class="order__detail-item">
            Товаров в заказе: <span>{{ cartList.length }} шт</span>
          </div>
          <div class="order__detail-item">
            Общая сумма заказа: <span>{{ formatCurrency(totalPrice) }}</span>
          </div>
        </div>
        <div :class="['order__positions', { 'is-open': positionsIsOpen && cartList.length > 0 }]">
          <button type="button" class="order__positions-button" @click="openPositionsList">
            Состав заказа
            <SvgIcon icon-name="arrow-down" />
          </button>
          <div ref="positionsList" class="order__positions-list">
            <div v-for="(productItem, index) in cartList" :key="index" class="order__position">
              <div class="order__position-image">
                <picture>
                  <img class="image" :src="productItem.imageUrl" :alt="productItem.name" />
                </picture>
              </div>
              <div class="order__position-info">
                <h4 class="order__position-title">{{ productItem.name }}</h4>
                <p class="order__position-size">
                  Выбранный размер: <span>{{ productItem.currentSize }}</span>
                </p>
                <div class="order__position-price">{{ formatCurrency(productItem.price) }}</div>
              </div>
              <button
                type="button"
                class="order__remove"
                @click="(removeFromCart(productItem), showNotification('Товар удалён из корзины'))"
              >
                <SvgIcon icon-name="trash" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="order__form">
        <AppForm
          :class="{ disabled: isDisabled || cartList.length === 0 }"
          :cart-data="cartList"
          :url="ORDER_URL"
          button-text="Оформить заказ"
          :order-number="orderNumber"
          @form-submitted="onSubmittedForm"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppForm from '@/components/AppForm.vue'
import SvgIcon from '@/components/ui/SvgIcon.vue'
import { ORDER_URL } from '@/constants/api'
import { useCartStore } from '@/store/cart'
import { useModalStore } from '@/store/modal'
import { showNotification } from '@/utils/notifications'
import { formatCurrency } from '@/utils/utils'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const { cartList, totalPrice } = storeToRefs(useCartStore())
const { removeFromCart } = useCartStore()

const { closeModal } = useModalStore()

const isDisabled = ref(false)
const onSubmittedForm = () => (isDisabled.value = true)

const positionsIsOpen = ref(false)
const positionsList = ref()

const openPositionsList = () => {
  if (!positionsIsOpen.value && cartList.value.length > 0) {
    positionsIsOpen.value = !positionsIsOpen.value
    positionsList.value.style.maxHeight = positionsList.value.scrollHeight + 'px'
  } else {
    positionsIsOpen.value = !positionsIsOpen.value
    positionsList.value.style.maxHeight = 0
  }
}

const orderNumber = ref(0)
const generateOrderNumber = () => {
  return Math.floor(Math.random() * (9999 - 0) + 0)
}

onMounted(() => (orderNumber.value = generateOrderNumber()))
</script>

<style>
.order {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 576px;
  max-height: calc(100dvh - 48px);
  margin: 24px 0;
  background-color: var(--white);
  transform: translate(-50%, calc(-50% - 24px));
  z-index: 15;
}

.order__closer {
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

.order__top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.order__title {
  display: none;
  padding-left: 8px;
  font: var(--font-20_700);
}

.order__content {
  max-height: inherit;
  padding: 40px;
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
}

.order__title,
.order__positions-button,
.order__position-title,
.order__position-price {
  color: var(--dark);
}

.order__detail {
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid var(--gray);
  border-radius: var(--radius);
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
}

.order__detail-list,
.order__positions-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.order__detail-item {
  font: var(--font-16_400);
  color: var(--gray);

  span {
    font: var(--font-16_700);
    color: var(--dark);
  }
}

.order__positions {
  margin-top: 32px;
  max-height: 240px;
}

.order__positions.is-open {
  .order__positions-button svg {
    transform: rotate(180deg);
  }

  .order__positions-list {
    opacity: 1;
    padding: 16px 0;
  }
}

.order__positions-list {
  max-height: 0;
  will-change: max-height;
  transition: all 0.4s;
  overflow: hidden;
  opacity: 0;
  box-sizing: content-box;
}

.order__positions-button {
  display: flex;
  align-items: center;
  gap: 4px;
  font: var(--font-16_400);

  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
    transition: transform 0.15s;
  }
}

.order__position {
  display: flex;
  align-items: center;
  gap: 16px;
}

.order__position-image {
  max-width: 80px;
  max-height: 80px;
}

.order__position-info {
  flex-grow: 1;
}

.order__position-title {
  font: var(--font-14_400);
  margin-bottom: 4px;
}

.order__position-size {
  font: var(--font-14_400);
  margin-bottom: 8px;
  color: var(--gray);

  span {
    font: var(--font-16_700);
    color: var(--dark);
  }
}

.order__position-price {
  font: var(--font-20_700);
}

.order__remove {
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    fill: var(--gray);
    transition: fill 0.15s;
  }
}

.order__form {
  .input {
    border: 1px solid var(--gray);
  }

  .form-success {
    color: var(--dark);
  }
}

@media (any-hover: hover) {
  .order__closer:hover {
    background-color: var(--accent);

    svg {
      fill: var(--white);
    }
  }

  .order__remove:hover {
    svg {
      fill: var(--dark);
    }
  }
}

@media (width <= 576px) {
  .order {
    inset: 0;
    transform: none;
    width: 100%;
    height: 100%;
    max-height: 100%;
    margin: 0;
  }

  .order__top {
    justify-content: space-between;
    box-shadow: 0 4px 16px 0 var(--dark-70);
    background-color: var(--white);
    z-index: 1;
  }

  .order__title {
    display: block;
  }

  .order__content {
    padding: 64px 20px 24px;
  }
}
</style>
