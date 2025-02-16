<template>
  <header class="header">
    <div class="container">
      <div class="header__container">
        <a href="/" class="logo">SneakMax</a>
        <AppNav />
        <button type="button" class="header__cart-opener" @click="openModal('Cart')">
          <span>Корзина</span>
          <SvgIcon icon-name="cart" />
          <span class="cart-counter">{{ cartList.length }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import AppNav from '@/components/AppNav.vue'
import SvgIcon from '@/components/ui/SvgIcon.vue'
import { useCartStore } from '@/store/cart'
import { useModalStore } from '@/store/modal'
import { storeToRefs } from 'pinia'

const { cartList } = storeToRefs(useCartStore())

const { openModal } = useModalStore()
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: var(--bg);
  padding: 16px 0 0;
  z-index: 5;
}

.header__container {
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

.header__cart-opener {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 40px;
  gap: 8px;
  font: var(--font-16_400);
  color: var(--white);
  transition: color 0.15s;

  svg {
    fill: currentColor;
    width: 20px;
    height: 20px;
    transition: fill 0.15s;
  }
}

.cart-counter {
  position: absolute;
  right: -8px;
  bottom: -4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  font: var(--font-14_400);
  border-radius: 50%;
  background-color: var(--accent);
  color: var(--white);
}

@media (any-hover: hover) {
  .header__cart-opener:hover {
    color: var(--white-hover);
  }
}

@media (width <= 1024px) {
  .header__cart-opener {
    margin-left: auto;

    span:first-child {
      display: none;
    }
  }
}
</style>
