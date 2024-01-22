<template>
    <div id="scroll-point" class="product__container">
        <h2 class="product__title">{{ productData.nameProduct }}</h2>
        <div class="product__body">
            <div class="product__image"><img :src="productData.urlAddress" alt="img" /></div>
            <div class="product__information information">
                <h3 class="information__name">{{ productData.nameProduct }}</h3>
                <div class="information__category">
                    <span class="information__subtitle">Category:</span> {{ productData.category }}
                </div>
                <div class="information__status">
                    <span class="information__subtitle">Status:</span> {{ firstLatter(productData.status) }}
                </div>
                <div class="information__color">
                    <span class="information__subtitle">Color:</span> {{ productData.color }}
                </div>
                <div class="information__size">
                    <span class="information__subtitle">Sizes:</span>
                    <div class="information__size-items">
                        <div v-for="size in productData.size" :key="size" class="information__size-item">
                            {{ size }}
                        </div>
                    </div>
                </div>
                <div class="information__price">
                    <span class="information__subtitle">Price:</span> ₦ {{ productData.price }}
                </div>
                <div class="information__buttons">
                    <button type="button" class="information__favorites-add" @click="addToFavorites(productData.id)">
                        <span v-if="favoritesSelect !== true">
                            <font-awesome-icon :icon="['far', 'heart']" style="color: #ed165f" />
                            MOVE TO FAVORITES
                        </span>
                        <span v-else>
                            <font-awesome-icon :icon="['fas', 'heart']" style="color: #ed165f" />
                            FAVORITES
                        </span>
                    </button>
                    <button type="button" class="information__cart-add" @click="addToCart(productData.id)">
                        <font-awesome-icon :icon="['fas', 'cart-shopping']" style="color: #ed165f" />
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useMainPageStore } from '@/store/useMainPageStore'
import { useUserAccountStore } from '@/store/useUserAccountStore'
export default {
    name: 'ProductPage',
    data() {
        return {
            productData: null,
            favoritesSelect: null,
        }
    },
    computed: {
        ...mapState(useMainPageStore, ['getProductByNumberId']),
        ...mapState(useUserAccountStore, ['getIncludesProductInFavoritesList']),
    },
    created() {
        this.productData = this.getProductByNumberId(this.$route.params.productId)
        this.favoritesSelect = this.auditFavoritesSelect(this.productData.id)
    },
    methods: {
        ...mapActions(useUserAccountStore, ['addToFavoritesList', 'addToCartList']),
        auditFavoritesSelect(idItem) {
            return this.getIncludesProductInFavoritesList(idItem)
        },
        addToFavorites(productId) {
            this.addToFavoritesList(productId)
            this.favoritesSelect = this.auditFavoritesSelect(productId)
        },
        addToCart(productId) {
            console.log('111')
            this.addToCartList(productId)
        },
        firstLatter(data) {
            data = data.split('')
            data[0] = data[0].toUpperCase()

            return data.join('')
        },
    },
}
</script>

<style lang="scss" scoped>
.product {
    // .product__container
    &__container {
        max-width: 1360px;
        padding: 110px 15px 25px;
        display: flex;
        flex-direction: column;
        row-gap: 3.75rem;
        align-items: center;
        @media (max-width: 991.98px) {
            row-gap: 2rem;
            padding: 80px 15px 30px;
        }
        @media (max-width: 500px) {
            row-gap: 1.8rem;
        }
    }
    // .product__title
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
    // .product__body
    &__body {
        display: grid;
        grid-template-columns: 30% 1fr;
        column-gap: 2rem;
        width: 100%;
        @media (max-width: 991.98px) {
            grid-template-columns: 35% 1fr;
        }
        @media (max-width: 700px) {
            grid-template-columns: 1fr;
        }
    }
    // .product__image
    &__image {
        position: relative;
        width: 100%;
        padding-top: 147%; /* 457/297 */
        overflow: hidden;
        & img {
            position: absolute;
            top: 0;
            left: 5%;
            width: 90%;
            height: 100%;
            object-fit: cover;
            @media (max-width: 991.98px) {
                left: 0;
                width: 100%;
            }
        }
        @media (max-width: 700px) {
            width: 42.428571%; /* 297/700 */
            padding-top: 65.285714%; /* 457/700 */
            margin: 0 auto;
        }
        @media (max-width: 700px) {
            width: 75%;
            padding-top: 110%;
        }
        @media (max-width: 400px) {
            width: 95%;
            padding-top: 140%;
        }
    }
    // .product__information
    &__information {
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
    }
}

.information {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    align-items: flex-start;
    // .information__name
    &__name {
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 1.02;
        letter-spacing: 0.2px;
        margin-bottom: 1rem;
    }
    // .information__subtitle
    &__subtitle {
        font-family: Mulish;
        font-size: 1rem;
        color: #686868;
        font-weight: 600;
        line-height: 1.12;
        letter-spacing: 0.2px;
    }
    // .information__category
    &__category ,
    // .information__status
    &__status,
    // .information__color
    &__color {
        font-size: 1rem;
        color: #111;
        font-weight: 600;
        line-height: 1.12;
        letter-spacing: 0.2px;
    }
    // .information__size
    &__size {
        display: flex;
        flex-direction: column;
        row-gap: 0.625rem;
        align-items: flex-start;
        margin-bottom: 1rem;
    }
    // .information__sizes-items
    &__size-items {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.5rem;
        @media (max-width: 400px) {
            grid-template-columns: repeat(3, 1fr);
        }
    }
    // .information__sizes-item
    &__size-item {
        padding: 0.5rem 0.9375rem;
        border: 1px solid #ed165f;
        border-radius: 1px;
    }
    // .information__price
    &__price {
        display: flex;
        color: #ed165f;
        font-family: Roboto;
        font-size: 1.2rem;
        line-height: 1.02;
        align-items: flex-end;
        column-gap: 5px;
    }

    // .information__buttons
    &__buttons {
        display: flex;
        width: 55%;
        justify-content: space-between;
        flex: 1 1 auto;
        align-items: flex-end;
        @media (max-width: 991.98px) {
            width: 100%;
        }
        @media (max-width: 400px) {
            flex-direction: column;
            margin-top: 1rem;
            row-gap: 1.5rem;
            align-items: flex-end;
        }
    }
    // .information__favorites-add
    &__favorites-add {
        background-color: #fff;
        border: 1px solid #fff;
        transition: border 0.3s;
        padding: 0.75rem 1rem;
        align-items: center;
        color: #ed165f;
        font-size: 0.9rem;
        font-weight: 700;
        line-height: 0.875rem; /* 140% */
        letter-spacing: 0.2px;
        & img {
            width: 1rem;
            height: 1rem;
        }
        @media (min-width: 992px) {
            &:hover {
                border: 1px solid #ed165f;
            }
        }
        @media (max-width: 991.98px) {
            background-color: rgba(255, 255, 255, 0.5);
            padding: 0;
        }
    }
    // .information__cart-add
    &__cart-add {
        background-color: #fff;
        border: 1px solid #fff;
        padding: 0.75rem 1rem;
        align-items: center;
        color: #ed165f;
        font-size: 0.9rem;
        font-weight: 700;
        line-height: 0.875rem; /* 140% */
        letter-spacing: 0.2px;
        transition: border 0.3s;
        & img {
            width: 1rem;
            height: 1rem;
            margin-left: 0.5rem;
        }
        @media (min-width: 992px) {
            &:hover {
                border: 1px solid #ed165f;
            }
        }
        @media (max-width: 991.98px) {
            background-color: rgba(255, 255, 255, 0.5);
            padding: 0;
        }
    }
}
</style>
