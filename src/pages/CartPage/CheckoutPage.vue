<template>
    <div class="checkout__container">
        <div class="checkout__body">
            <shopping-address :data-address="getUserDataDetail(detailDelivery)" />
            <div class="checkout__middle">
                <delivery-method />
                <payment-method />
            </div>
            <div class="checkout__summary">
                <order-summary />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'pinia'
import { useUserAccountStore } from '@/store/useUserAccountStore'
import ShoppingAddress from '@/components/CartPage/ShoppingAddress.vue'
import DeliveryMethod from '@/components/CartPage/DeliveryMethod.vue'
import PaymentMethod from '@/components/CartPage/PaymentMethod.vue'
import OrderSummary from '@/components/CartPage/OrderSummary.vue'
export default {
    name: 'CheckoutPage',
    components: {
        ShoppingAddress,
        DeliveryMethod,
        PaymentMethod,
        OrderSummary,
    },

    data() {
        return {
            detailDelivery: 'postAddress',
        }
    },
    computed: {
        ...mapState(useUserAccountStore, ['getUserDataDetail']),
    },
}
</script>

<style lang="scss" scoped>
.checkout {
    // .checkout__container
    &__container {
        padding: 130px 15px 64px;
        @media (max-width: 991.98px) {
            padding: 80px 15px 50px;
        }
    }
    // .checkout__body
    &__body {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 2rem;
        @media (max-width: 1200px) {
            column-gap: 1rem;
        }
        @media (max-width: 991.98px) {
            grid-template-columns: repeat(2, 1fr);
            row-gap: 1rem;
        }
        @media (max-width: 850px) {
            grid-template-columns: 1fr;
        }
    }
    // .checkout__middle
    &__middle {
        display: flex;
        flex-direction: column;
        row-gap: 2rem;
        @media (max-width: 1200px) {
            row-gap: 1rem;
        }
    }
    // .checkout__summary
    &__summary {
        @media (max-width: 991.98px) {
            grid-column: 1/3;
        }
        @media (max-width: 850px) {
            grid-column: 1/2;
        }
    }
}
</style>
