<template>
  <div class="gallery">
    <div class="gallery__logo">
      <picture>
        <img loading="lazy" src="/img/insta.png" class="image" alt="Инстаграм" />
      </picture>
    </div>
    <div class="gallery__layout">
      <div
        v-for="(galleryItem, index) in galleryItems"
        :key="index"
        :class="['gallery__item', { 'gallery__item--wide': index === 2 }]"
      >
        <picture>
          <img loading="lazy" :src="galleryItem" class="image" alt="Галерея" />
        </picture>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const galleryItems = [
  '/img/gallery/1.jpg',
  '/img/gallery/2.jpg',
  '/img/gallery/3.jpg',
  '/img/gallery/4.jpg',
  '/img/gallery/5.jpg',
]
</script>

<style scoped>
.gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
}

.gallery__layout {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
}

.gallery__item {
  grid-column: span 2;
  border-radius: var(--radius);
  overflow: hidden;
  aspect-ratio: 1 / 1;
}

.gallery__item.gallery__item--wide {
  grid-column: 3 / 7;
  grid-row: 1 / span 2;
}

@media (width <= 1024px) {
  .gallery {
    padding: 0;
  }
}
</style>
