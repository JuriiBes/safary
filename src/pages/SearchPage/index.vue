<template>
    <div id="scroll-point" class="search__container">
        <h2 class="search__title">Search result</h2>
        <div v-if="valueResult !== null" class="search__request">
            You searched: <span> {{ valueResult }}</span>
        </div>
        <label class="search__label"
            ><input v-model="valueSearch" type="text" placeholder="Search..." class="search__input" />
            <button type="button" @click="runSearch">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #111111" />
            </button>
        </label>
        <div class="search__products">
            <div v-for="product in getProductListToRender" :key="product.id" class="search__item">
                <product-item-card
                    :product-item="product"
                    :favorites-select="includesFavorites(product.id)"
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
import { useSearchPageStore } from '@/store/useSearchPageStore'
import { useUserAccountStore } from '@/store/useUserAccountStore'
import ProductItemCard from '@/components/ProductItemCard'
import { scrollToBlock } from '@/store/helpers/helpers'
export default {
    name: 'SearchPage',
    components: {
        ProductItemCard,
    },
    data() {
        return {
            selectPagination: 0,
            favoritesList: null,
            valueResult: null,
            valueSearch: null,
        }
    },
    computed: {
        ...mapState(useSearchPageStore, ['getProductListToRender', 'getNumberButtonsToPagination']),
        ...mapState(useUserAccountStore, ['getIncludesProductInFavoritesList']),
    },
    created() {
        this.aSortedListProduct()

        // Search
        if (this.$route.params.request) {
            this.aValueSearch(this.$route.params.request)
            this.valueResult = this.$route.params.request
        }
        // ---Search
        // Pagination
        this.aListProductToRenderCard(0)
        // ---Pagination
    },
    methods: {
        ...mapActions(useSearchPageStore, ['aListProductToRenderCard', 'aSortedListProduct', 'aValueSearch']),
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
        // ---Cart
        runSearch() {
            this.aValueSearch(this.valueSearch)
            this.valueResult = this.valueSearch
            this.valueSearch = null
        },
    },
}
</script>

<style lang="scss" scoped>
.search {
    // .search__container
    &__container {
        max-width: 1360px;
        padding: 120px 15px 125px;
        display: flex;
        flex-direction: column;
        row-gap: 3.75rem;
        align-items: center;
        @media (max-width: 991.98px) {
            row-gap: 2.5rem;
            padding: 80px 15px 50px;
        }
        @media (max-width: 500px) {
            row-gap: 1.8rem;
        }
    }
    // .search__title
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
    // .search__request
    &__request {
        max-width: 68.75rem;
        color: #000;
        font-size: 24px;
        line-height: 1.4;
        & span {
            color: #ed165f;
            font-weight: 500;
        }
        @media (max-width: 991.98px) {
            font-size: 20px;
        }
        @media (max-width: 700px) {
            line-height: 1.2;
        }
        @media (max-width: 450px) {
            display: flex;
            flex-direction: column;
            row-gap: 0.5rem;
        }
    }
    &__label {
        display: flex;
        justify-content: center;
    }
    // .search__input
    &__input {
        position: relative;
        color: rgba(0, 0, 0, 0.5);
        font-size: 0.75rem;
        line-height: 1.125rem; /* 150% */
        letter-spacing: 0.2px;
        width: 10.9375rem;
        border-bottom: 0.5px solid rgba(0, 0, 0, 0.5);
        outline: none;
        transition: 0.3s;
        background-color: transparent;
    }
    // .search__icon
    &__icon {
        width: 1rem;
        height: 1rem;
        transition: 0.3s;
        font-size: 1rem;
    }
    // .search__products
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
