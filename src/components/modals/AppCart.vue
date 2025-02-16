<template>
  <div class="cart">
    <div class="cart__top">
      <p class="cart__title">Корзина</p>
      <button type="button" class="cart__closer" @click="closeModal">
        <SvgIcon icon-name="close" />
      </button>
    </div>
    <p v-if="cartList.length === 0" class="cart__empty">
      <SvgIcon icon-name="cart" />
      Ваша корзина пуста, самое время её пополнить!
    </p>
    <div v-else class="cart__list">
      <div v-for="(productItem, index) in cartList" :key="index" class="cart__item">
        <div class="cart__item-image">
          <img class="image" :src="productItem.imageUrl" :alt="productItem.name" />
        </div>
        <div class="cart__item-info">
          <h4 class="cart__item-title">{{ productItem.name }}</h4>
          <p class="cart__item-size">
            Выбранный размер: <span>{{ productItem.currentSize }}</span>
          </p>
          <div class="cart__item-price-container">
            <div :class="['cart__item-price', { 'cart__item-price--discount': productItem.discount }]">
              {{ formatCurrency(productItem.price) }}
            </div>
            <div v-if="productItem.discount && productItem.oldPrice !== undefined" class="cart__item-price-old">
              {{ formatCurrency(productItem.oldPrice) }}
            </div>
          </div>
        </div>
        <button
          type="button"
          class="cart__remove"
          @click="(removeFromCart(productItem), showNotification('Товар удалён из корзины'))"
        >
          <SvgIcon icon-name="trash" />
        </button>
      </div>
    </div>
    <div class="cart__bottom">
      <div class="cart__total-container">
        <p class="cart__total">Итого:</p>
        <p class="cart__total-price">{{ formatCurrency(totalPrice) }}</p>
      </div>
      <AppButton :disabled="cartList.length === 0" variant="accent" @click="openModal('Order')"
        >Перейти к оформлению</AppButton
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppButton from '@/components/ui/AppButton.vue'
import SvgIcon from '@/components/ui/SvgIcon.vue'
import { useCartStore } from '@/store/cart'
import { useModalStore } from '@/store/modal'
import { showNotification } from '@/utils/notifications'
import { formatCurrency } from '@/utils/utils'
import { storeToRefs } from 'pinia'

const { cartList, totalPrice } = storeToRefs(useCartStore())
const { removeFromCart } = useCartStore()

const { openModal, closeModal } = useModalStore()
</script>

<style scoped>
@media (any-hover: hover) {
  .cart__remove:hover {
    svg {
      fill: var(--dark);
    }
  }
}

.cart {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: calc((100vw - var(--content-width)) / 2);
  width: 480px;
  height: 480px;
  top: var(--header-height);
  background-color: var(--white);
  z-index: 15;
}

.cart__top {
  display: none;
  align-items: center;
  justify-content: space-between;
  padding-left: 8px;
  box-shadow: 0 4px 16px 0 var(--dark-70);
  z-index: 1;
}

.cart__title {
  font: var(--font-16_700);
  color: var(--dark);
}

.cart__closer {
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

.cart__empty {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  font: var(--font-30_700);
  text-align: center;
  color: var(--dark);

  svg {
    width: 64px;
    height: 64px;
    fill: var(--dark);
  }
}

.cart__list {
  flex-grow: 1;
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

.cart__item {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.cart__item-image {
  max-width: 120px;
  max-height: 120px;
  flex-shrink: 0;
}

.cart__item-info {
  flex-grow: 1;
}

.cart__remove {
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    fill: var(--gray);
    transition: fill 0.15s;
  }
}

.cart__bottom {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -4px 16px 0 var(--dark-70);
}

.cart__item-title,
.cart__item-price,
.cart__total,
.cart__total-price {
  color: var(--dark);
}

.cart__item-title {
  font: var(--font-16_400);
  margin-bottom: 4px;
}

.cart__item-size {
  font: var(--font-14_400);
  color: var(--gray);
  margin-bottom: 8px;

  span {
    font: var(--font-16_700);
    color: var(--dark);
  }
}

.cart__item-price-container {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cart__item-price {
  font: var(--font-20_700);
}

.cart__item-price.cart__item-price--discount {
  color: var(--accent);
}

.cart__item-price-old {
  font: var(--font-14_400);
  color: var(--gray);
  text-decoration: line-through;
}

.cart__total {
  font: var(--font-14_400);
  margin-bottom: 8px;
}

.cart__total-price {
  font: var(--font-20_700);
}

@media (any-hover: hover) {
  .cart__closer:hover {
    background-color: var(--accent);

    svg {
      fill: var(--white);
    }
  }
}

@media (width <= 1220px) {
  .cart {
    right: var(--container-offset);
  }
}

@media (width <= 576px) {
  .cart {
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .cart__empty {
    font: var(--font-20_700);

    svg {
      width: 48px;
      height: 48px;
    }
  }

  .cart__top {
    display: flex;
  }

  .cart__item {
    padding: 8px;
  }

  .cart__item-image {
    max-width: 80px;
    max-height: 80px;
  }

  .cart__item-title {
    font: var(--font-14_400);
  }

  .cart__item-price-container {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: unset;
  }

  .cart__item-price {
    font: var(--font-16_700);
  }

  .cart__bottom {
    padding: 8px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    .button {
      width: 100%;
    }
  }

  .cart__total {
    margin-bottom: 4px;
  }
}
</style>
