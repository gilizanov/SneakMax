<template>
  <section class="section section--bg description">
    <div class="container grid">
      <p class="description__text">Кроссовки известных брендов с доставкой по России и СНГ</p>
      <p class="description__subtext">
        Мы продаем кроссовки брендов Nike, Adidas, Puma, Reebok, Converse и многие другие по низким ценам
      </p>
      <h1 class="description__title">SneakMax</h1>
      <a class="button button--accent" href="#catalog">Перейти к покупкам</a>
    </div>
  </section>
</template>

<style scoped>
.description {
  padding-top: 80px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

  .button {
    grid-column: span 3;
  }
}

.description__text {
  grid-column: span 6;
  font: var(--font-36_400);
}

.description__subtext {
  grid-column: span 5;
  grid-row: 2;
  font: var(--font-16_400);
}

.description__text,
.description__title,
.description__subtext {
  color: var(--white);
}

.description__title {
  grid-column: span 12;
  font-weight: 700;
  font-size: 200px;
  opacity: 0.15;
}

@media (width <= 1024px) {
  .description__text,
  .description__subtext {
    margin-bottom: 8px;
    font: var(--font-16_400);
  }

  .description__title {
    margin-bottom: 16px;
    grid-column: span 6;
    font: var(--font-36_400);
  }

  .description {
    .button {
      grid-column: span 2;
    }
  }
}

@media (width <= 576px) {
  .description__text,
  .description__subtext,
  .description__title {
    grid-column: span 2;
  }

  .description {
    .button {
      grid-column: span 1;
    }
  }
}
</style>
