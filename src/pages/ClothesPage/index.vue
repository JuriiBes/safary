<template>
    <product-category-page :title-category="titlePage" :subcategory-list="category" :sizes-list="sizes" />
</template>

<script>
import ProductCategoryPage from '@/components/ProductCategoryPage.vue'
import { categoryClothes } from '@/data/data-clothes-filters'
import { sizesClothes } from '@/data/data-clothes-filters'

export default {
    name: 'ClothesPage',
    components: {
        ProductCategoryPage,
    },

    data() {
        return {
            titlePage: 'Clothes',
            category: categoryClothes,
            sizes: sizesClothes,
        }
    },
}
</script>

<style lang="scss" scoped></style>
