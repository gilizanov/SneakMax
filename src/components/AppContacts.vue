<template>
  <section id="contacts" class="section contacts">
    <div class="container grid">
      <div class="contacts__info">
        <SectionTitle variant="dark">Контакты</SectionTitle>
        <ul class="contacts__list">
          <li v-for="(contact, index) in contacts" :key="index" class="contacts__item">
            <div class="contacts__subtitle-container">
              <h3 class="contacts__subtitle">{{ contact.title }}</h3>
              <AppTooltip v-if="contact.tooltip">{{ contact.tooltip }}</AppTooltip>
            </div>
            <a href="tel:+78007898989" class="contacts__phone">{{ contact.phone }}</a>
            <p class="contacts__adress">{{ contact.address }}</p>
          </li>
        </ul>
        <AppSocial />
      </div>
      <div class="contacts__map">
        <picture>
          <img loading="lazy" src="/img/map.png" class="image" alt="Карта" />
        </picture>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import AppSocial from '@/components/ui/AppSocial.vue'
import AppTooltip from '@/components/ui/AppTooltip.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'

const contacts = [
  {
    title: 'Главный офис',
    phone: '+7 800 789 89 89',
    address: 'г. Санкт-Петербург, ул.Пушкина, д.Колотушкина',
    tooltip:
      'Адрес и телефон для корреспонденции, инвесторов. Вопросы о доставке, качестве обслуживания и товаре просьба задавать в отдел продаж.',
  },
  {
    title: 'Отдел продаж',
    phone: '+7 800 789 89 89',
    address: 'г. Санкт-Петербург, ул.Пушкина, д.Колотушкина',
    tooltip:
      'По этому адресу расположен шоурум, в котором вы можете купить обувь, а наши консультанты подберут для Вас идеальную пару кроссовок.',
  },
  {
    title: 'Пункт выдачи онлайн-заказов',
    phone: '+7 800 789 89 89',
    address: 'г. Санкт-Петербург, ул.Пушкина, д.Колотушкина',
  },
]
</script>

<style scoped>
.contacts {
  background-color: var(--light);
}

.contacts__info {
  grid-column: span 5;
}

.contacts__list {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 24px;
}

.contacts__subtitle-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;

  .contacts__subtitle {
    margin: 0;
  }
}

.contacts__subtitle {
  margin-bottom: 16px;
  font: var(--font-14_400);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--gray);
}

.contacts__phone,
.contacts__adress {
  color: var(--dark);
}

.contacts__phone {
  font: var(--font-30_700);
}

.contacts__adress {
  font: var(--font-16_400);
}

.contacts__map {
  grid-column: 6 / span 7;
  border-radius: var(--radius);
  overflow: hidden;
}

@media (width <= 1024px) {
  .contacts__info,
  .contacts__map {
    grid-column: span 6;
  }

  .contacts__map {
    margin-top: 40px;
  }
}

@media (width <= 576px) {
  .contacts__info,
  .contacts__map {
    grid-column: span 2;
  }

  .contacts {
    .tooltip {
      display: none;
    }
  }
}
</style>
