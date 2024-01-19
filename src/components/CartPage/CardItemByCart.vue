<template>
    <div class="shopping-cart">
        <div class="shopping-cart__item item">
            <h3 class="item__title">ITEM DESCRIPTION</h3>
            <div class="item__body">
                <div class="item__image">
                    <img :src="productData.urlAddress" alt="img" />
                </div>
                <div class="item__info">
                    <div class="item__name">{{ productData.nameProduct }}</div>
                    <div class="item__color">Color: {{ productData.color }}</div>
                    <div class="item__buttons">
                        <button
                            type="button"
                            class="item__favorites"
                            @click.capture="addToFavoritesItem(productData.id)"
                        >
                            <span v-if="favoritesSelect !== true">
                                <font-awesome-icon :icon="['far', 'heart']" style="color: #ed165f" />
                                MOVE TO FAVORITES
                            </span>
                            <span v-else>
                                <font-awesome-icon :icon="['fas', 'heart']" style="color: #ed165f" />
                                FAVORITES
                            </span>
                        </button>
                        <button type="button" class="item__remove" @click.capture="removeItemCart(productData.id)">
                            <font-awesome-icon :icon="['fas', 'circle-xmark']" class="item__icon" /> remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="shopping-cart__size size">
            <h3 class="size__title">Select Size</h3>
            <div class="size__body">
                <select :ref="sizeCart" v-model="sizeSelect" class="size__select">
                    <option v-for="size in productData.size" :key="size" :value="size">{{ size }}</option>
                </select>
            </div>
        </div>
        <div class="shopping-cart__quantity quantity">
            <h3 class="quantity__title">QUANTITY</h3>
            <div class="quantity__body">
                <quantity-count :value-quantity="cartInfo.quantity" @count="countItem" />
            </div>
        </div>
        <div class="shopping-cart__price price">
            <h3 class="price__title">UNIT PRICE</h3>
            <div class="price__body">₦ {{ productData.price }}</div>
        </div>
        <div class="shopping-cart__subtotal subtotal">
            <h3 class="subtotal__title">SUB TOTAL</h3>
            <div class="subtotal__body">₦ {{ subTotal(productData.id) }}</div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useMainPageStore } from '@/store/useMainPageStore'
import { useUserAccountStore } from '@/store/useUserAccountStore'
import QuantityCount from '@/components/QuantityCount.vue'
export default {
    name: 'CardItemByCart',
    components: {
        QuantityCount,
    },
    props: {
        cartInfo: {
            type: Object,
            default: () => ({}),
        },
        itemIndex: {
            type: Number,
            default: 1,
        },
    },
    emits: ['subtotal', 'remove', 'sizeSelect'],
    data() {
        return {
            productData: null,
            sizeSelect: null,
            quantityValue: this.cartInfo.quantity,
            favoritesSelect: null,
        }
    },
    computed: {
        ...mapState(useMainPageStore, ['getProductByNumberId']),
        ...mapState(useUserAccountStore, ['getIncludesProductInFavoritesList']),
    },
    watch: {
        sizeSelect(newValue) {
            this.$emit('sizeSelect', { name: this.itemIndex, size: newValue })
            this.addSizeToDataByProductCart({ name: this.itemIndex, size: newValue })
        },
    },
    created() {
        this.productData = this.getProductByNumberId(this.cartInfo.idProduct)
        this.favoritesSelect = this.auditFavoritesSelect(this.productData.id)
        if (this.cartInfo.size) this.sizeSelect = this.cartInfo.size
    },
    methods: {
        ...mapActions(useUserAccountStore, [
            'changeQuantityCartItem',
            'deleteCartItem',
            'addToFavoritesList',
            'addSizeToDataByProductCart',
        ]),
        countItem(value) {
            this.quantityValue = value
        },
        subTotal(idItem) {
            let totalSum = this.productData.price * this.quantityValue
            this.changeQuantityCartItem(this.itemIndex, this.quantityValue)
            this.$emit('subtotal', { id: idItem, total: totalSum })
            return totalSum
        },
        auditFavoritesSelect(idItem) {
            return this.getIncludesProductInFavoritesList(idItem)
        },
        addToFavoritesItem(idItem) {
            this.addToFavoritesList(idItem)
            this.favoritesSelect = this.auditFavoritesSelect(idItem)
        },

        removeItemCart(idItem) {
            this.deleteCartItem(this.itemIndex)
            this.$emit('remove', true)
            this.$emit('subtotal', { id: idItem, total: 0 })
        },
    },
}
</script>

<style lang="scss" scoped>
.shopping-cart {
    display: grid;
    grid-template-columns: 45% repeat(4, 1fr);
    gap: 0.0625rem;
    @media (max-width: 1100px) {
        grid-template-columns: 50% repeat(4, 1fr);
    }
    @media (max-width: 991.98px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 700px) {
        grid-template-columns: repeat(2, 1fr);
    }

    // .shopping-cart__item
    // .shopping-cart__size
    // .shopping-cart__quantity
    // .shopping-cart__price
    // .shopping-cart__subtotal
    &__item,
    &__size,
    &__quantity,
    &__price,
    &__subtotal {
        display: flex;
        flex-direction: column;
        // row-gap: 1rem;
        width: 100%;
        box-shadow: 0px 0px 0.3125rem 0.0625rem rgba(0, 0, 0, 0.1);
    }
    [class*='__title'] {
        padding: 1rem 2rem 0;
        color: #686868;
        font-weight: 600;
        line-height: 1.12;
        letter-spacing: 0.0125rem;
        text-transform: uppercase;
    }
}
.size__body,
.quantity__body,
.price__body,
.subtotal__body {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.625rem 0.3125rem;
}
.item {
    @media (max-width: 991.98px) {
        grid-column: 1/5;
    }
    @media (max-width: 700px) {
        grid-column: 1/3;
    }
    // .item__title
    &__title {
        text-align: start;
    }
    // .item__body
    &__body {
        // box-shadow: 0px 0px 0.3125rem 0.0625rem rgba(0, 0, 0, 0.1);
        height: 100%;
        display: flex;
        flex-direction: row;
        column-gap: 2rem;
        align-items: center;
        justify-content: flex-start;
        padding: 0.8125rem 2rem 1.6875rem;
        @media (max-width: 991.98px) {
            padding: 0.8125rem 2rem;
        }
        @media (max-width: 500px) {
            flex-direction: column;
        }
    }
    // .item__image
    &__image {
        position: relative;
        width: 5.4375rem;
        height: 7.625rem;
        overflow: hidden;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
        @media (max-width: 991.98px) {
            width: 120px;
            height: 165px;
        }
        @media (max-width: 500px) {
            width: 180px;
            height: 270px;
        }
        & img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    // .item__info
    &__info {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
        align-items: flex-start;
        width: 100%;
        height: 100%;
        padding-top: 15px;
        padding-bottom: 5px;
        @media (max-width: 500px) {
            height: auto;
        }
    }
    // .item__name
    &__name {
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 1.02; /* 90% */
        letter-spacing: 0.0125rem;
        text-align: start;
    }
    // .item__color
    &__color {
        flex: 1 1 auto;
        color: #686868;
        font-weight: 600;
        line-height: 1.12;
        letter-spacing: 0.2px;
    }
    // .item__buttons
    &__buttons {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    // .item__favorites
    // .item__remove
    &__favorites,
    &__remove {
        display: flex;
        flex-wrap: nowrap;
        color: #ed165f;
        column-gap: 10px;
        font-weight: 600;
        line-height: 1.12;
        letter-spacing: 0.2px;
        text-transform: uppercase;
        align-items: center;
        justify-content: flex-start;
        text-align: start;
        & span {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            column-gap: 5px;
            align-items: center;
            justify-content: flex-start;
            text-align: start;
        }
    }
    // .item__icon
    &__icon {
        padding-right: 0.3125rem;
    }
}
.size {
    // .size__title
    &__title {
    }
    // .size__body
    &__body {
    }
    // .size__select
    &__select {
        padding: 0.3125rem 0.625rem;
        background-color: #fff;
        outline: none;
        color: #686868;
        font-weight: 600;
        line-height: 1.12;
        letter-spacing: 0.2px;
        border-bottom: 1px solid #686868;
    }
}
</style>
