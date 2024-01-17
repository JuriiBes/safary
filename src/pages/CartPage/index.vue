<template>
    <div class="cart__container">
        <div class="cart__body">
            <h2 class="cart__title">Shopping Cart</h2>
            <div :key="reload" class="cart__items">
                <div v-for="(item, index) in cartData.cartItems" :key="index" class="cart__item">
                    <card-item-by-cart
                        :cart-info="item"
                        :item-index="index"
                        @subtotal="subTotalItem"
                        @remove="removeItem"
                        @size-select="addSizeToItemCart"
                    />
                </div>
            </div>
            <div class="cart__total">
                <div class="cart__total-body">
                    <p>Total:</p>
                    <p>₦ {{ total }}</p>
                </div>
                <p class="cart__delivery-info">Delivery fee not included yet</p>
            </div>
            <div class="cart__buttons button">
                <button type="button" class="button__continue" @click="goToHomePage">CONTINUE SHOPPING</button>
                <button
                    type="button"
                    :class="['button__checkout', disabledStatusStyle]"
                    :disabled="disabledStatus !== true"
                    @click="goToCheckout"
                >
                    PROCEED TO CHECKOUT
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'pinia'
import { useUserAccountStore } from '@/store/useUserAccountStore'
import CardItemByCart from '@/components/CartPage/CardItemByCart.vue'

export default {
    name: 'CartPage',
    components: {
        CardItemByCart,
    },
    data() {
        return {
            detailName: 'cart',
            cartData: null,
            subTotalCartItems: {},
            total: 0,
            reload: 1,
            selectSizesItemsProductCart: {},
            disabledStatusStyle: 'disabled-status',
            disabledStatus: false,
        }
    },
    computed: {
        ...mapState(useUserAccountStore, ['getUserDataDetail']),
    },
    watch: {
        subTotalCartItems: {
            handler(newValue) {
                this.totalCart(newValue)
            },
            deep: true,
        },
        selectSizesItemsProductCart: {
            handler(newValue) {
                this.auditCheckedSize(newValue)
            },
            deep: true,
        },
    },
    created() {
        this.cartData = this.getUserDataDetail(this.detailName)
    },
    methods: {
        subTotalItem(value) {
            this.subTotalCartItems[value.id] = value.total
        },
        totalCart(arrValue) {
            let totalSum = 0
            for (const element in arrValue) {
                totalSum = arrValue[element] + totalSum
            }
            this.total = totalSum
        },
        removeItem(newValue) {
            if (newValue == true) this.reload = this.reload + 1
        },
        goToHomePage() {
            this.$router.push({ name: 'home' })
        },
        goToCheckout() {
            this.$router.push({ name: 'checkout' })
        },
        addSizeToItemCart(value) {
            this.selectSizesItemsProductCart[value.name] = value.size
        },
        auditCheckedSize(sizesSelectedData) {
            if (sizesSelectedData) {
                if (Object.keys(sizesSelectedData).length === this.cartData.cartItems.length) {
                    this.disabledStatus = true
                    this.disabledStatusStyle = null
                } else {
                    this.disabledStatus = false
                    this.disabledStatusStyle = 'disabled-status'
                }
            } else {
                this.disabledStatus = false
                this.disabledStatusStyle = 'disabled-status'
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.cart {
    // .cart__container
    &__container {
        padding: 130px 15px 64px;
        @media (max-width: 991.98px) {
            padding: 80px 15px 50px;
        }
    }
    // .cart__body
    &__body {
        display: flex;
        flex-direction: column;
        row-gap: 4.375rem;
        @media (max-width: 991.98px) {
            row-gap: 2.5rem;
        }
    }
    // .cart__title
    &__title {
        display: flex;
        font-size: 24px;
        font-weight: 800;
        line-height: 1.02;
        letter-spacing: 0.2px;
        justify-content: flex-start;
    }
    // .cart__items
    &__items {
        display: flex;
        flex-direction: column;
        row-gap: 2rem;
    }
    // .cart__item
    &__item {
    }
    // .cart__total
    &__total {
        display: flex;
        flex-direction: column;
        row-gap: 1.0625rem;
        align-items: flex-end;
        justify-content: center;
    }
    // .cart__total-body
    &__total-body {
        display: flex;
        flex-wrap: nowrap;
        column-gap: 4rem;
        font-size: 1.5rem;
        font-weight: 600;
        line-height: 1.2;
        text-transform: uppercase;
        &::last-child {
            font-family: Roboto;
            font-size: 1.5rem;
            font-weight: 600;
        }
    }
    // .cart__delivery-info
    &__delivery-info {
    }
    // .cart__buttons
    &__buttons {
    }
}
.button {
    display: flex;
    flex-wrap: wrap;
    column-gap: 2rem;
    justify-content: flex-end;
    @media (max-width: 687.98px) {
        row-gap: 0.5rem;
    }
    // .button__continue
    &__continue {
        display: flex;
        padding: 12px 27px 0.6875rem 1.625rem;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        border: 1px solid #ed165f;
        font-size: 1rem;
        font-weight: 800;
        line-height: 1.33;
        letter-spacing: 2px;
        text-transform: uppercase;
        transition: 0.3s;
        @media (min-width: 992px) {
            &:hover {
                background-color: rgba(237, 22, 94, 0.15);
            }
        }
        @media (max-width: 991.98px) {
            padding: 10px 25px;
            font-size: 0.7rem;
        }
    }
    // .button__checkout
    &__checkout {
        display: flex;
        padding: 0.75rem 2.0625rem 0.6875rem 2.0625rem;
        justify-content: center;
        align-items: center;
        background-color: #ed165f;
        border-radius: 0.375rem;
        border: 1px solid #ed165f;
        color: #fff;
        font-size: 1rem;
        font-weight: 800;
        line-height: 1.33;
        letter-spacing: 2px;
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
}
.disabled-status {
    background-color: rgba(237, 22, 94, 0.7);
    cursor: default;
}
</style>
