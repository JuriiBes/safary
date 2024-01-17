<template>
    <product-category-page :title-category="titlePage" :subcategory-list="category" :sizes-list="sizes" />
</template>

<script>
import ProductCategoryPage from '@/components/ProductCategoryPage.vue'
import { categoryAccessories } from '@/data/data-accessories-filters'
import { sizesAccessories } from '@/data/data-accessories-filters'

export default {
    name: 'AccessoriesPage',
    components: {
        ProductCategoryPage,
    },

    data() {
        return {
            titlePage: 'Accessories',
            category: categoryAccessories,
            sizes: sizesAccessories,
        }
    },
}
</script>

<style lang="scss" scoped></style>
