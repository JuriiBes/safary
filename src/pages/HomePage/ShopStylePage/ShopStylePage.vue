<template>
    <div id="scroll-point" class="shop-style__container">
        <div class="shop-style__title">Shop your style</div>
        <div class="shop-style__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae gravida cursus adipiscing viverra at tortor,
            egestas odio parturient. Morbi ut lorem in erat. Et et molestie diam diam ultricies. Scelerisque duis diam
            ac cras dictum adipiscing. Venenatis at sit proin ut vitae adipiscing id facilisis.
        </div>
        <div v-if="isLoading == true">
            <loading-page />
        </div>
        <div v-else class="shop-style__products">
            <div v-for="product in getProductListToRender" :key="product.id" class="shop-style__item">
                <product-item-card
                    :product-item="product"
                    :favorites-select="includesFavorites(product.id)"
                    :includes-cart="includesCart(product.id)"
                    @selected="addFavorites"
                    @add-cart="addCartItem"
                />
            </div>
        </div>
        <div class="pagination">
            <button
                v-for="(button, index) in getNumberButtonsToPagination"
                :key="index"
                type="button"
                :class="['pagination-button', { 'selected-pagination': index === selectPagination }]"
                @click="aListProductToRenderCard(index), selectedPagination(index)"
            >
                {{ button }}
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useMainPageStore } from '@/store/useMainPageStore'
import { useUserAccountStore } from '@/store/useUserAccountStore'
import ProductItemCard from '@/components/ProductItemCard'
import LoadingPage from '@/components/LoadingPage'
import { scrollToBlock } from '@/store/helpers/helpers'
export default {
    name: 'ShopStylePage',
    components: {
        ProductItemCard,
        LoadingPage,
    },
    data() {
        return {
            selectPagination: 0,
            favoritesList: null,
        }
    },

    computed: {
        ...mapState(useMainPageStore, ['getProductListToRender', 'getNumberButtonsToPagination', 'isLoading']),
        ...mapState(useUserAccountStore, ['getIncludesProductInFavoritesList', 'getIncludesProductInCart']),
    },
    created() {},

    methods: {
        ...mapActions(useMainPageStore, ['aListProductToRenderCard']),
        ...mapActions(useUserAccountStore, ['addToFavoritesList', 'addToCartList']),
        // Pagination
        selectedPagination(index) {
            this.selectPagination = index

            scrollToBlock('scroll-point')
        },
        // ---Pagination
        // Favorites
        addFavorites(value) {
            this.addToFavoritesList(value)
        },
        includesFavorites(itemId) {
            return this.getIncludesProductInFavoritesList(itemId)
        },
        // ---Favorites
        // Cart
        addCartItem(itemId) {
            this.addToCartList(itemId)
        },
        includesCart(itemId) {
            return this.getIncludesProductInCart(itemId)
        },
        // ---Cart
    },
}
</script>

<style lang="scss" scoped>
.shop-style {
    // .shop-style__container
    &__container {
        padding-top: 3.875rem;
        padding-bottom: 8.125rem;
        display: flex;
        flex-direction: column;
        row-gap: 3.75rem;
        align-items: center;
        @media (max-width: 991.98px) {
            row-gap: 2.5rem;
            padding-bottom: 5rem;
        }
        @media (max-width: 500px) {
            row-gap: 1.8rem;
            padding-bottom: 3.55rem;
        }
    }
    // .shop-style__title
    &__title {
        position: relative;
        color: #000;
        font-size: 40px;
        font-weight: 700;
        line-height: 1.2;
        padding: 0 7.625rem;
        background-color: #fff;
        @media (max-width: 991.98px) {
            font-size: 32px;
        }
        @media (max-width: 700px) {
            padding: 0 2.5rem;
        }
        @media (max-width: 450px) {
            padding: 0 1.5rem;
        }
        &::before,
        &::after {
            content: '';
            position: absolute;
            top: 50%;
            width: 100vw;
            height: 1px;
            background-color: #111;
        }
        &::before {
            right: 100%;
        }
        &::after {
            left: 100%;
        }
    }
    // .shop-style__description
    &__description {
        max-width: 68.75rem;
        color: #000;
        font-size: 24px;
        line-height: 1.4;
        @media (max-width: 991.98px) {
            font-size: 20px;
        }
        @media (max-width: 700px) {
            line-height: 1.2;
        }
    }
    // .shop-style__products
    &__products {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        row-gap: 6.1875rem;
        column-gap: 3.125rem;
        justify-content: space-between;
        @media (max-width: 1150px) {
            row-gap: 3rem;
            column-gap: 2.5rem;
        }
        @media (max-width: 991.98px) {
            grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 950px) {
            row-gap: 1.8rem;
            column-gap: 1.5rem;
        }
        @media (max-width: 680px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: 480px) {
            grid-template-columns: repeat(1, 1fr);
        }
    }
}
// ..pagination
.pagination {
    display: flex;
    flex-wrap: wrap;
    row-gap: 0.5rem;
    justify-content: center;
}
// ..pagination-button
.pagination-button {
    box-sizing: border-box;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: 14px; /* 100% */
    letter-spacing: 0.2px;
    padding: 5px 31px 21px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    transition: 0.1s;
    transition: color 0.2s;
    @media (min-width: 992px) {
        &:hover {
            color: #ed165f;
        }
    }
}
.pagination-button__active {
    border-bottom: 1px solid #ed165f;
}
.selected-pagination {
    border-bottom: 3px solid #ed165f;
    padding: 5px 31px 20px;
}
</style>
