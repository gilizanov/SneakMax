<template>
  <section id="about" class="section section--bg about">
    <div class="container grid">
      <div class="about__container">
        <SectionTitle variant="white">Пара слов о нас</SectionTitle>
        <p class="about__text">
          Наши кроссовки сочетают в себе стильный дизайн и высокое качество материалов, обеспечивая комфорт и
          уверенность в каждом шаге - идеальный выбор для активного образа жизни.
        </p>
        <span class="about__cite">SneakMax</span>
      </div>
      <div class="about__image">
        <picture>
          <img loading="lazy" src="/img/about.png" class="image" alt="О нас" />
        </picture>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import SectionTitle from '@/components/ui/SectionTitle.vue'
</script>

<style scoped>
.about {
  padding: 0;
  background-image: url(/img/about-decor.svg);
  background-repeat: no-repeat;
  background-position: 0 0;

  .container {
    align-items: center;
  }

  .section-title {
    margin-bottom: 24px;
  }
}

.about__container {
  grid-column: span 5;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.about__image {
  grid-column: span 7;
}

.about__text {
  font: var(--font-16_400);
}

.about__cite {
  font: var(--font-20_700);
}

.about__text,
.about__cite {
  color: var(--white);
}

.about__cite {
  position: relative;
  align-self: flex-end;
  display: block;
  margin-top: 24px;
  text-align: right;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: calc(100% + 16px);
    transform: translateY(-50%);
    display: block;
    width: 32px;
    height: 4px;
    background-color: var(--white);
  }
}

@media (width <= 1024px) {
  .about {
    background-image: none;
  }

  .about__container {
    grid-column: span 2;
  }

  .about__image {
    grid-column: span 4;
  }

  .about__text {
    font: var(--font-14_400);
  }

  .about__cite {
    margin-top: 8px;
    font: var(--font-16_700);

    &::before {
      right: calc(100% + 8px);
      width: 16px;
      height: 2px;
    }
  }
}

@media (width <= 576px) {
  .section-title {
    margin-bottom: 16px;
  }

  .about__container {
    padding: 40px 0;
    grid-column: span 2;
  }

  .about__image {
    order: -1;
    margin-left: calc(var(--container-offset) * (-1));
    margin-right: calc(var(--container-offset) * (-1));
    grid-column: span 2;
  }
}
</style>
