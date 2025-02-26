<template>
    <div id="scroll-point" class="render__container">
        <h2 class="render__title">{{ titleCategory }}</h2>
        <div class="render__body">
            <div :class="['render__filter-aside', activeFilter]">
                <filter-category :array-data="subcategoryList" @category="categoryFilter" />
                <filter-size :sizes-data="sizesList" @size="sizeFilter" />
                <filter-color @color="colorFilter" />
                <filter-price @price="priceFilter" />
            </div>
            <div class="render__right-aside">
                <sort-select @sort-product="sortProductList" />
                <div v-if="isLoading == true">
                    <loading-page />
                </div>
                <div v-else class="render__card">
                    <div v-for="(product, index) in getFilteredProductList" :key="index">
                        <product-item-card
                            :product-item="product"
                            :favorites-select="includesFavorites(product.id)"
                            :includes-cart="includesCart(product.id)"
                            @selected="addFavorites"
                            @add-cart="addCartItem"
                        />
                    </div>
                </div>
            </div>
            <button type="button" class="render__filter-icon-menu" @click="activeFilterMenu">
                <font-awesome-icon
                    v-if="activeFilter == null"
                    :icon="['fas', 'arrow-down-wide-short']"
                    style="color: #ec8787f2"
                />
                <font-awesome-icon v-else :icon="['fas', 'arrow-up-wide-short']" style="color: #ec8787f2" />
            </button>
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
import FilterCategory from '@/components/FilterAside/FilterCategory'
import FilterColor from '@/components/FilterAside/FilterColor'
import FilterSize from '@/components/FilterAside/FilterSize'
import FilterPrice from '@/components/FilterAside/FilterPrice'
import ProductItemCard from '@/components/ProductItemCard'
import SortSelect from '@/components/SortSelect.vue'
import LoadingPage from '@/components/LoadingPage'
import { useMainPageStore } from '@/store/useMainPageStore'
import { scrollToBlock } from '@/store/helpers/helpers'
import { mapState, mapActions } from 'pinia'
import { useProductCategoryPageStore } from '@/store/useProductCategoryPageStore'
import { useUserAccountStore } from '@/store/useUserAccountStore'
export default {
    name: 'ProductCategoryPage',
    components: {
        FilterCategory,
        FilterColor,
        FilterSize,
        FilterPrice,
        ProductItemCard,
        SortSelect,
        LoadingPage,
    },
    props: {
        titleCategory: {
            type: String,
            required: true,
        },
        subcategoryList: {
            type: Array,
            default: () => [],
        },
        sizesList: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            dataFilter: {
                category: null,
                color: [],
                size: [],
                price: null,
            },
            sortBySelect: null,
            selectPagination: 0,
            activeFilter: null,
        }
    },
    computed: {
        ...mapState(useMainPageStore, ['isLoading']),
        ...mapState(useProductCategoryPageStore, ['getFilteredProductList', 'getNumberButtonsToPagination']),
        ...mapState(useUserAccountStore, ['getIncludesProductInFavoritesList', 'getIncludesProductInCart']),
    },
    watch: {
        dataFilter: {
            handler(newValue) {
                this.aFilteredProductList(newValue)
            },
            deep: true,
        },
        sortBySelect(newValue) {
            this.aSortSelectValue(newValue)
            this.selectPagination = 0
        },
    },
    created() {
        // console.log('aaaaaaaaaaaaaaa----------------------------')
        this.aCreateDataProductList(this.titleCategory)
        this.aSortSelectValue('createDate')

        // Pagination
        this.aListProductToRenderCard(0)
        // ---Pagination
    },
    mounted() {
        this.aFilteredProductList(this.dataFilter)
    },

    methods: {
        ...mapActions(useProductCategoryPageStore, [
            'aCreateDataProductList',
            'aFilteredProductList',
            'aListProductToRenderCard',
            'aSortSelectValue',
        ]),
        ...mapActions(useUserAccountStore, ['addToFavoritesList', 'addToCartList']),
        // Filters
        categoryFilter(category) {
            this.dataFilter.category = category
        },
        colorFilter(color) {
            this.dataFilter.color = color
        },
        sizeFilter(size) {
            this.dataFilter.size = size
        },
        priceFilter(price) {
            this.dataFilter.price = price
        },
        sortProductList(value) {
            this.sortBySelect = value
        },
        // ---Filters

        // Pagination
        selectedPagination(index) {
            this.selectPagination = index
            scrollToBlock('scroll-point')
        },
        // ---Pagination
        // Filter menu
        activeFilterMenu() {
            if (this.activeFilter === null) {
                this.activeFilter = 'active-menu'
                document.documentElement.style.overflow = 'hidden'
            } else {
                this.activeFilter = null
                document.documentElement.style.overflow = 'auto'
            }
        },
        // ---Filter menu

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
.render {
    // .render__container
    &__container {
        max-width: 1360px;
        padding: 140px 15px 125px;
        @media (max-width: 991.98px) {
            padding: 80px 15px 50px;
        }
    }
    // .render__title
    &__title {
        color: #000;
        font-size: 30px;
        text-transform: uppercase;
        font-weight: 800;
        line-height: 18px;
        letter-spacing: 3px;
        text-align: start;
        margin-bottom: 64px;
        @media (max-width: 991.98px) {
            margin-bottom: 35px;
        }
    }
    // .render__body
    &__body {
        display: grid;
        grid-template-columns: 1fr 3fr;
        column-gap: 3.0625rem;
        @media (max-width: 1150px) {
            column-gap: 2.5rem;
        }
        @media (max-width: 991.98px) {
            grid-template-columns: 1fr;
        }
    }
    // .render__filter-aside
    &__filter-aside {
        @media (max-width: 991.98px) {
            position: fixed;
            background-color: rgba(247, 245, 245, 0.97);
            z-index: 2;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            padding: 80px 25px;
            align-items: center;
            transition: 0.3s;
            overflow-y: auto;
        }
    }
    // .render__right-aside
    &__right-aside {
    }
    // .render__filter-icon-menu
    &__filter-icon-menu {
        @media (min-width: 992px) {
            display: none;
        }
        width: 35px;
        height: 35px;
        position: fixed;
        z-index: 9;
        top: 70px;
        right: 10px;
        background-color: hsla(0, 73%, 73%, 0.4);
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    }
    // .render__card
    &__card {
        border-top: 1px solid rgba(0, 0, 0, 0.5);
        display: grid;
        grid-template-columns: repeat(3, 1fr);

        justify-content: space-between;
        column-gap: 1.25rem;
        row-gap: 3.75rem;
        padding-top: 1.25rem;
        @media (max-width: 1150px) {
            row-gap: 2.5rem;
        }
        @media (max-width: 991.98px) {
            row-gap: 1.5rem;
        }
        @media (max-width: 950px) {
            row-gap: 1.8rem;
            column-gap: 1.5rem;
        }
        @media (max-width: 680px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: 480px) {
            grid-template-columns: 1fr;
            & div {
                display: flex;
                justify-content: center;
            }
        }
    }
}

.active-menu {
    left: 0;
}

.pagination {
    display: flex;
    flex-wrap: wrap;
    row-gap: 0.5rem;
    justify-content: center;
    margin-top: 6.25rem;
    @media (max-width: 991.98px) {
        margin-top: 2.25rem;
    }
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
