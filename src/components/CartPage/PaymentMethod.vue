<template>
    <div class="checkout__payment payment">
        <h2 class="payment__title">
            <font-awesome-icon :icon="['fas', 'circle-check']" class="payment__icon" />Payment Methods
        </h2>
        <div class="payment__payment-list">
            <label class="payment__label">
                <input name="payment-method" type="radio" checked value="card" @click="checkedPayment('card')" />
                <div class="payment__data">
                    <h4 class="payment__subtitle">Pay with card</h4>
                    <p>(Get 5% off total price and money back guarantee)</p>
                </div>
            </label>
            <div class="payment__warning">You will be redirected to Paystack payment gateway</div>
            <label class="payment__label">
                <input name="payment-method" type="radio" value="delivery" @click="checkedPayment('delivery')" />
                <div class="payment__data">
                    <h4 class="payment__subtitle">Pay on delivery</h4>
                    <ul class="payment__list">
                        <li class="payment__list-item">
                            Kindly note that we will only accept POS payment option on delivery
                        </li>
                        <li class="payment__list-item">You have to make payment before opening package</li>
                        <li class="payment__list-item">
                            Once the seal is broken, item can only be returned if damaged or defective
                        </li>
                    </ul>
                </div>
            </label>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useUserAccountStore } from '@/store/useUserAccountStore'
export default {
    name: 'PaymentMethod',
    created() {
        this.addPaymentMethodToCart('card')
    },
    methods: {
        ...mapActions(useUserAccountStore, ['addPaymentMethodToCart']),
        checkedPayment(method) {
            this.addPaymentMethodToCart(method)
        },
    },
}
</script>

<style lang="scss" scoped>
.checkout {
    // .checkout__payment
    &__payment {
        display: flex;
        flex-direction: column;
        row-gap: 4.1875rem;
        padding: 4rem 1.9375rem;
        box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
        @media (max-width: 1150px) {
            padding: 2.5rem 1rem;
        }
        @media (max-width: 991.98px) {
            padding: 1rem;
            row-gap: 2.5rem;
        }
    }
}
.payment {
    // .payment__title
    &__title {
        font-size: 1.25rem;
        font-weight: 800;
        line-height: 1.02;
        text-align: start;
    }
    // .payment__icon
    &__icon {
        font-size: 1rem;
        color: #ed165f;
        padding-right: 0.4375rem;
    }
    // .payment__payment-list
    &__payment-list {
        display: flex;
        flex-direction: column;
        row-gap: 2rem;
        @media (max-width: 991.98px) {
            row-gap: 1rem;
        }
    }
    // .payment__label
    &__label {
        display: flex;
        flex-wrap: nowrap;
        column-gap: 0.9375rem;
        align-items: flex-start;
        & > input {
            margin-top: 2px;
        }
    }
    // .payment__data
    &__data {
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
        align-items: flex-start;
        & > p {
            color: #686868;
            font-size: 0.875rem;
            line-height: 1.28;
            text-align: start;
        }
    }
    &__subtitle {
        font-size: 0.875rem;
        line-height: 1.28;
        font-weight: 600;
        text-align: start;
    }
    // .payment__warning
    &__warning {
        font-size: 0.625rem;
        line-height: 1.28;
        text-align: start;
        margin-top: -1rem;
    }
    // .payment__list
    &__list {
        display: flex;
        flex-direction: column;
        padding-top: 0.5rem;
        row-gap: 0.25rem;
    }
    // .payment__list-item
    &__list-item {
        position: relative;
        font-size: 10px;
        line-height: 1.28;
        text-align: start;
        &::before {
            content: '';
            position: absolute;
            top: 0.25rem;
            left: -1rem;
            width: 0.25rem;
            height: 0.25rem;
            border-radius: 50%;
            background-color: #111;
        }
    }
}
</style>
