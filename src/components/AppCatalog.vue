<template>
  <section id="catalog" class="section catalog">
    <div class="container grid">
      <SectionTitle variant="dark">Каталог</SectionTitle>
      <CatalogSortingBlock />
      <CatalogFilter />
      <CatalogProductList />
    </div>
  </section>
</template>

<script lang="ts" setup>
import CatalogFilter from '@/components/catalog/CatalogFilter.vue'
import CatalogProductList from '@/components/catalog/CatalogProductList.vue'
import CatalogSortingBlock from '@/components/catalog/CatalogSortingBlock.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
</script>

<style scoped>
.catalog .container {
  align-items: flex-start;
}
</style>
