<template>
    <div class="card__body">
        <div class="card__image">
            <img
                :src="productItem.urlAddress"
                alt="image product"
                class="card__image-product"
                @click="goToProductPage(productItem.id)"
            />

            <div class="card__hover">
                <button type="button" class="card__favorites-add" @click="addToFavorites(productItem.id)">
                    <font-awesome-icon
                        v-if="favoritesSelect !== true"
                        :icon="['far', 'heart']"
                        style="color: #ed165f"
                    />
                    <font-awesome-icon v-else :icon="['fas', 'heart']" style="color: #ed165f" />
                </button>
                <button type="button" class="card__cart-add" @click="addToCartList(productItem.id)">
                    ADD TO CART
                    <font-awesome-icon :icon="['fas', 'cart-shopping']" style="color: #ed165f" />
                </button>
            </div>
        </div>
        <div class="card__product-name" @click="goToProductPage(productItem.id)">
            {{ productItem.nameProduct }}
        </div>
        <div class="card__price" @click="goToProductPage(productItem.id)">₦ {{ productItem.price }}</div>
    </div>
</template>

<script>
export default {
    name: 'ProductItemCard',
    props: {
        productItem: {
            type: Object,
            default: () => ({}),
        },
        favoritesSelect: {
            type: Boolean,
        },
    },
    emits: ['selected', 'addCart'],

    methods: {
        addToFavorites(itemId) {
            this.$emit('selected', itemId)
        },
        addToCartList(itemId) {
            this.$emit('addCart', itemId)
        },
        goToProductPage(idProduct) {
            this.$router.push({
                name: 'product',
                params: {
                    productId: idProduct,
                },
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.card {
    // .card__body
    &__body {
        max-width: 18.75rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        padding: 10px;

        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
        @media (min-width: 992px) {
            &:hover {
                .card__hover {
                    opacity: 1;
                }
            }
        }
        @media (max-width: 480px) {
            width: 18.75rem;
        }
    }
    // .card__image
    &__image {
        position: relative;
        width: 100%;
        padding-top: 150%; /* 450/300 */
        overflow: hidden;
        margin-bottom: 1rem;
    }
    // .card__image-product
    &__image-product {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    // .card__hover
    &__hover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        row-gap: 0.8125rem;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.25);
        opacity: 0;
        transition: 0.5s;
        @media (max-width: 991.98px) {
            opacity: 1;
            background-color: transparent;
            align-items: flex-end;
            justify-content: flex-end;
            padding-bottom: 10px;
            padding-right: 5px;
            row-gap: 0.5rem;
        }
    }
    // .card__favorites-add
    &__favorites-add {
        width: 2.1875rem;
        height: 2.1875rem;
        background-color: #fff;
        border: 1px solid #fff;
        transition: border 0.3s;
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
            border: 1px solid rgba(237, 22, 94, 0.5);
        }
    }
    // .card__cart-add
    &__cart-add {
        height: 2.1875rem;
        background-color: #fff;
        border: 1px solid #fff;
        padding: 0.75rem 1rem;
        align-items: center;
        color: #ed165f;
        font-size: 0.625rem;
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
            border: 1px solid rgba(237, 22, 94, 0.5);
        }
    }

    // .card__product-name
    &__product-name {
        text-align: center;
        font-size: 1.25rem;
        line-height: 1.1;
        letter-spacing: 0.2px;
        flex: 1 1 auto;
        cursor: pointer;
        transition: 0.3s;
        @media (min-width: 992px) {
            &:hover {
                color: #ed165f;
            }
        }
    }
    // .card__price
    &__price {
        color: #ed165f;
        font-family: Roboto;
        font-size: 1.25rem;
        cursor: pointer;
        transition: 0.3s;
        @media (min-width: 992px) {
            &:hover {
                color: rgba(237, 22, 94, 0.75);
            }
        }
    }
}
</style>
