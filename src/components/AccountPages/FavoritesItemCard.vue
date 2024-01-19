<template>
    <div class="favorites-item">
        <div class="favorites-item__body">
            <div class="favorites-item__image">
                <img :src="productData.urlAddress" alt="img" />
            </div>
            <div class="favorites-item__info">
                <div class="favorites-item__name">{{ productData.nameProduct }}</div>
                <div class="favorites-item__color">Color - {{ productData.color }}</div>

                <div class="favorites-item__price">Price - ₦ {{ productData.price }}</div>
            </div>
        </div>
        <div class="favorites-item__button button">
            <button type="button" class="button__buy-now" @click="addToCartPositionWithFavorites">buy now</button>
            <button type="button" class="button__remove" @click="deleteItemFavorites">
                <font-awesome-icon :icon="['fas', 'circle-xmark']" class="button__icon" />
                remove
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useMainPageStore } from '@/store/useMainPageStore'
import { useUserAccountStore } from '@/store/useUserAccountStore'

export default {
    name: 'FavoritesItemCard',
    props: {
        favoritesId: {
            type: Number,
            required: true,
        },
    },
    emits: ['delete'],
    data() {
        return {
            productData: null,
        }
    },
    computed: {
        ...mapState(useMainPageStore, ['getProductByNumberId']),
        ...mapState(useUserAccountStore, ['getIncludesProductInCart']),
    },
    created() {
        this.productData = this.getProductByNumberId(this.favoritesId)
    },
    methods: {
        ...mapActions(useUserAccountStore, ['addToCartPositionsWithOrderOrFavorites']),
        deleteItemFavorites() {
            this.$emit('delete')
        },
        addToCartPositionWithFavorites() {
            if (this.getIncludesProductInCart(this.favoritesId) < 0) {
                let dataProductsWithFavorites = []
                let itemToCart = {
                    idProduct: this.favoritesId,
                    quantity: 1,
                }
                dataProductsWithFavorites.push(itemToCart)

                this.addToCartPositionsWithOrderOrFavorites(dataProductsWithFavorites)
            }
            this.$router.push({ name: 'cart' })
        },
    },
}
</script>

<style lang="scss" scoped>
.favorites-item {
    display: flex;
    flex-direction: column;
    row-gap: 2.6875rem;
    padding: 1.9375rem;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
    @media (max-width: 1100px) {
        padding: 1.25rem;
    }
    @media (max-width: 991.98px) {
        row-gap: 1.55rem;
    }
    // .favorites-item__body
    &__body {
        display: flex;
        flex-wrap: nowrap;
        column-gap: 2rem;
        @media (max-width: 400px) {
            column-gap: 1rem;
        }
    }
    // .favorites-item__image
    &__image {
        flex-shrink: 0;
        position: relative;
        width: 5.4375rem;
        height: 7.625rem;
        overflow: hidden;
        & img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    // .favorites-item__info
    &__info {
        display: flex;
        flex-direction: column;
        row-gap: 0.8rem;
        align-items: flex-start;
        padding-top: 0.625rem;
    }
    // .favorites-item__name
    &__name {
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 1.02;
        letter-spacing: 0.2px;
        text-align: start;
        @media (max-width: 400px) {
            font-size: 1.15rem;
        }
    }
    // .favorites-item__color
    &__color {
        color: #686868;
        font-weight: 600;
        line-height: 1.12;
        letter-spacing: 0.2px;
    }
    // .favorites-item__price
    &__price {
        color: #ed165f;
        font-family: Roboto;
        font-size: 14px;
    }
    // .favorites-item__button
    &__button {
    }
}
.button {
    display: flex;
    justify-content: space-between;
    // .button__buy-now
    &__buy-now {
        display: flex;
        padding: 12px 33px;
        justify-content: center;
        align-items: center;
        border-radius: 0.375rem;
        background: #ed165f;
        color: #fff;
        font-size: 1rem;
        font-weight: 800;
        line-height: 1.33;
        letter-spacing: 0.125rem;
        text-transform: uppercase;
        transition: 0.3s;
        @media (min-width: 992px) {
            &:hover {
                background-color: rgba(237, 22, 94, 0.7);
            }
        }
        @media (max-width: 991.98px) {
            padding: 10px 25px;
            font-size: 0.7rem;
        }
    }
    // .button__remove
    &__remove {
        display: flex;
        flex-wrap: nowrap;
        column-gap: 0.5rem;
        align-items: center;
        color: #ed165f;
        font-size: 16px;
        font-weight: 600;
        line-height: 1.12;
        text-transform: uppercase;
        letter-spacing: 0.2px;
        transition: 0.3s;

        @media (min-width: 992px) {
            &:hover {
                color: rgba(237, 22, 94, 0.5);
                & .button__icon {
                    color: rgba(237, 22, 94, 0.5);
                }
            }
        }
        @media (max-width: 991.98px) {
            font-size: 0.8rem;
        }
    }
    // .button__icon
    &__icon {
        // style="color: "
        color: #ed165f;
        transition: 0.3s;
    }
}
</style>
