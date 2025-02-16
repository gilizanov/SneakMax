<template>
  <section id="team" class="section section--bg team">
    <div class="container grid">
      <SectionTitle variant="white">Наша команда</SectionTitle>
      <ul class="team__list grid">
        <li v-for="(teamItem, index) in team" :key="index" class="team__item">
          <div class="team__item-image">
            <picture>
              <img loading="lazy" :src="teamItem.imageUrl" class="image" alt="Наша команда" />
            </picture>
          </div>
          <h4 class="team__item-name">{{ teamItem.name }}</h4>
          <p class="team__item-position">{{ teamItem.position }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
import SectionTitle from '@/components/ui/SectionTitle.vue'

const team = [
  {
    imageUrl: '/img/team/team-1.jpg',
    name: 'Иван Иванович',
    position: 'Директор',
  },
  {
    imageUrl: '/img/team/team-2.jpg',
    name: 'Петр Петрович',
    position: 'Администратор',
  },
  {
    imageUrl: '/img/team/team-3.jpg',
    name: 'Василий Васильевич',
    position: 'Администратор',
  },
  {
    imageUrl: '/img/team/team-4.jpg',
    name: 'Александр Александрович',
    position: 'Менеджер',
  },
  {
    imageUrl: '/img/team/team-5.jpg',
    name: 'Дмитрий Дмитриевич',
    position: 'Продавец-консультант',
  },
  {
    imageUrl: '/img/team/team-6.jpg',
    name: 'Владимир Владимирович',
    position: 'Констультант',
  },
]
</script>

<style scoped>
.team {
  background-image: url(/img/team-decor.svg);
  background-repeat: no-repeat;
  background-position: 100% 0;
}

.team__list {
  grid-column: span 12;
  row-gap: 40px;
}

.team__item {
  grid-column: span 4;
}

.team__item-image {
  aspect-ratio: 1 / 1;
  margin-bottom: 16px;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);

  img {
    width: 100%;
    height: 100%;
  }
}

.team__item-name,
.team__item-position {
  color: var(--white);
}

.team__item-name {
  font: var(--font-20_700);
  margin-bottom: 8px;
}

.team__item-position {
  font: var(--font-16_400);
}

@media (width <= 1024px) {
  .team__list {
    grid-column: span 6;
  }

  .team__item {
    grid-column: span 3;
  }
}

@media (width <= 576px) {
  .team__list {
    grid-column: span 2;
  }

  .team__item {
    grid-column: span 2;
  }
}
</style>
