<template>
  <section class="section feedback">
    <div class="container grid">
      <AppConsultation />
      <AppGallery />
    </div>
  </section>
</template>

<script lang="ts" setup>
import AppConsultation from './AppConsultation.vue'
import AppGallery from './AppGallery.vue'
</script>

<style scoped>
.feedback {
  .consultation {
    grid-column: span 4;
  }

  .gallery {
    grid-column: 5 / span 8;
  }
}

@media (width <= 1024px) {
  .feedback {
    .consultation,
    .gallery {
      grid-column: span 6;
    }
  }
}

@media (width <= 576px) {
  .feedback {
    .consultation,
    .gallery {
      grid-column: span 2;
    }
  }
}
</style>
