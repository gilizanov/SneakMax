<template>
  <div class="nav">
    <a v-for="(link, index) in links" :key="index" :href="link.url" class="nav__link">{{ link.title }}</a>
  </div>
</template>

<script lang="ts" setup>
const links = [
  {
    title: 'Каталог',
    url: '#catalog',
  },
  {
    title: 'О нас',
    url: '#about',
  },
  {
    title: 'Подбор товара',
    url: '#quiz',
  },
  {
    title: 'Наша команда',
    url: '#team',
  },
  {
    title: 'FAQ',
    url: '#faq',
  },
  {
    title: 'Контакты',
    url: '#contacts',
  },
]
</script>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 40px;
}

.nav__link {
  font: var(--font-16_400);
  color: var(--white);
  transition: color 0.15s;
}

@media (any-hover: hover) {
  .nav__link:hover {
    color: var(--white-hover);
  }
}

@media (width <= 1024px) {
  .nav {
    display: none;
  }
}
</style>
