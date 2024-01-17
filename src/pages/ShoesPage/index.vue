<template>
    <product-category-page :title-category="titlePage" :subcategory-list="category" :sizes-list="sizes" />
</template>

<script>
import ProductCategoryPage from '@/components/ProductCategoryPage.vue'
import { categoryShoes } from '@/data/data-shoes-filters'
import { sizesShoes } from '@/data/data-shoes-filters'

export default {
    name: 'ShoesPage',
    components: {
        ProductCategoryPage,
    },

    data() {
        return {
            titlePage: 'Shoes',
            category: categoryShoes,
            sizes: sizesShoes,
        }
    },
}
</script>

<style lang="scss" scoped></style>
