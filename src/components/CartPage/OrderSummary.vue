<template>
    <div class="checkout__summary summary">
        <h2 class="summary__title">ORDER SUMMARY</h2>
        <div class="summary__body">
            <card-item-by-summary
                v-for="(item, index) in dataCart.cartItems"
                :key="index"
                :cart-data-item="item"
                @total-item="addToTotalCart"
            />
        </div>
        <div class="summary__subtotal subtotal">
            <div class="subtotal__cart"><span>Cart sub-total</span>₦ {{ cartItemTotal }}</div>
            <div class="subtotal__delivery"><span>Delivery fee</span>₦ {{ dataCart.delivery.deliveryPrice }}</div>
        </div>
        <div class="summary__total"><span>TOTAL:</span>₦ {{ cartItemTotal + dataCart.delivery.deliveryPrice }}</div>
    </div>
    <div class="checkout__question question">
        <div class="question__main">
            <div class="question__title">Is this a gift?</div>
            <div class="question__body">
                <div>
                    <input id="yes" type="radio" name="question" class="question__input" />
                    <label for="yes" class="question__label">Yes</label>
                </div>
                <div>
                    <input id="no" type="radio" name="question" class="question__input" checked />
                    <label for="no" class="question__label">No</label>
                </div>
            </div>
        </div>
        <div class="question__info">
            A complimentary gift receipt will be included in the package, and prices will be hidden on the receipt.
        </div>
    </div>
    <div class="checkout__button">
        <button type="button" @click="placeOrder">PLACE ORDER</button>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useUserAccountStore } from '@/store/useUserAccountStore'
import { useMainPageStore } from '@/store/useMainPageStore'
import CardItemBySummary from '@/components/CartPage/CardItemBySummary.vue'
export default {
    name: 'OrderSummary',
    components: {
        CardItemBySummary,
    },
    data() {
        return {
            detailName: 'cart',
            dataCart: null,
            totalCart: {},
            cartItemTotal: null,
        }
    },
    computed: {
        ...mapState(useUserAccountStore, ['getUserDataDetail']),
        ...mapState(useMainPageStore, ['getProductByNumberId']),
    },
    watch: {
        totalCart: {
            handler(newValue) {
                this.totalSumCartItem(newValue)
            },
            deep: true,
        },
    },
    created() {
        this.dataCart = this.getUserDataDetail(this.detailName)
    },
    methods: {
        ...mapActions(useUserAccountStore, ['addOrderToOrders']),
        addToTotalCart(value) {
            this.totalCart[value.idProduct] = value.total
        },
        totalSumCartItem(dataSumCart) {
            let totalSum = 0
            for (const element in dataSumCart) {
                totalSum += dataSumCart[element]
            }
            this.cartItemTotal = totalSum
        },
        placeOrder() {
            let productListToOrder = []
            let date = new Date()
            let orderDate = date.getDay() + '/' + (parseInt(date.getMonth()) + 1) + '/' + date.getFullYear()
            for (const cartItem of this.dataCart.cartItems) {
                let newItem = {
                    idProduct: cartItem.idProduct,
                    quantity: cartItem.quantity,
                    size: cartItem.size,
                    dateOrder: orderDate,
                    price: this.getProductByNumberId(cartItem.idProduct).price,
                }
                productListToOrder.push(newItem)
            }
            console.log('this.dataCart')
            console.log(this.dataCart)

            this.addOrderToOrders({
                productList: productListToOrder,
                delivery: {
                    deliveryMethod: this.dataCart.delivery.deliveryMethod,
                    deliveryPrice: this.dataCart.delivery.deliveryPrice,
                    deliveryStatus: this.dataCart.delivery.deliveryStatus,
                    deliveryAddress: this.dataCart.delivery.deliveryAddress,
                },
            })

            this.$router.push({ name: 'orders' })
        },
    },
}
</script>

<style lang="scss" scoped>
.checkout {
    // .checkout__summary
    &__summary {
        display: flex;
        flex-direction: column;
        row-gap: 2rem;
        padding: 4rem 0 2rem;
        box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
        @media (max-width: 1150px) {
            padding: 2.5rem 0 1rem;
        }
        @media (max-width: 991.98px) {
            padding: 1rem 0 1rem;
        }
    }
    // .checkout__question
    &__question {
    }
    // .checkout__button
    &__button {
        display: flex;
        justify-content: center;
        & button {
            display: flex;
            width: 100%;
            color: #fff;
            justify-content: center;
            font-size: 1rem;
            font-weight: 800;
            line-height: 1.33;
            letter-spacing: 0.125rem;
            text-transform: uppercase;
            border-radius: 0.375rem;
            background: #ed165f;
            padding: 0.75rem 9.9375rem;
            transition: 0.3s;
            @media (min-width: 992px) {
                &:hover {
                    background-color: rgba(237, 22, 94, 0.7);
                }
            }
            @media (max-width: 991.98px) {
                width: auto;
                padding: 0.625rem 5rem;
            }
            @media (max-width: 750px) {
                font-size: 0.7rem;
            }
        }
    }
}
.summary {
    // .summary__title
    &__title {
        font-size: 1.25rem;
        font-weight: 800;
        line-height: 1.02;
        text-align: center;
        text-transform: uppercase;
    }
    // .summary__body
    &__body {
        font-size: 1rem;
        color: #ed165f;
        padding: 10px 1.9375rem 3.375rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        row-gap: 0.625rem;
        @media (max-width: 1150px) {
            padding: 10px 1rem 3.375rem;
        }
        @media (max-width: 991.98px) {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            padding: 10px 1rem 1rem;
        }
        @media (max-width: 750px) {
            grid-template-columns: 1fr;
        }
    }
    // .summary__subtotal
    &__subtotal {
    }
    // .summary__total
    &__total {
        display: flex;
        justify-content: space-between;
        padding: 0 1.9375rem;
        color: #ed165f;
        font-family: Roboto;
        font-size: 16px;
        line-height: 1.02;
    }
}

.subtotal {
    padding: 10px 1.9375rem 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    // .subtotal__cart
    // .subtotal__delivery
    &__cart,
    &__delivery {
        display: flex;
        justify-content: space-between;
    }
}
.question {
    padding: 2.6875rem 1.9375rem 4rem;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    // .question__main
    &__main {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
    }
    // .question__title
    &__title {
        font-weight: 600;
        line-height: 1.12;
        letter-spacing: 0.2px;
    }
    // .question__body
    &__body {
        display: flex;
        flex-wrap: nowrap;
        column-gap: 2rem;
    }
    // .question__input
    &__input {
        display: none;
        pointer-events: none;
        &:checked ~ label {
            background-color: #ed165f;
            border: 1px solid #ed165f;
            color: #fff;
        }
    }
    // .question__label
    &__label {
        display: flex;
        width: 47px;
        height: 40px;
        border-radius: 5px;
        background-color: transparent;
        border: 1px solid #000;
        color: #000;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        line-height: 1.12;
        letter-spacing: 0.2px;
        transition: all 0.2s;
        cursor: pointer;
        @media (max-width: 750px) {
            width: 40px;
            height: 32px;
        }
    }
    // .question__info
    &__info {
        font-size: 14px;
        line-height: 1.28;
        letter-spacing: 0.2px;
        text-align: justify;
    }
}
</style>
