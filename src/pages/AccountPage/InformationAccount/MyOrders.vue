<template>
    <div class="orders">
        <h2 class="orders__title">My Orders</h2>
        <div class="orders__body">
            <div v-for="(order, index) in ordersData" :key="index" class="orders__item">
                <order-item-card :order-item-data="order" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'pinia'
import { useUserAccountStore } from '@/store/useUserAccountStore'
import OrderItemCard from '@/components/AccountPages/OrderItemCard.vue'
export default {
    name: 'MyOrders',
    components: {
        OrderItemCard,
    },
    data() {
        return {
            detailName: 'orders',
            ordersData: null,
        }
    },
    computed: {
        ...mapState(useUserAccountStore, ['getUserDataDetail']),
    },
    created() {
        this.ordersData = this.getUserDataDetail(this.detailName)
    },
}
</script>

<style lang="scss" scoped>
.orders {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    // .orders__title
    &__title {
        font-size: 1.5rem;
        line-height: 1; /* 75% */
        text-align: start;
        margin-bottom: 2rem;
        letter-spacing: 0.0125rem;
        @media (max-width: 991.98px) {
            margin-bottom: 1rem;
        }
    }
    // .orders__body
    &__body {
        display: flex;
        flex-direction: column;
        row-gap: 4rem;
        width: 100%;
        @media (max-width: 991.98px) {
            row-gap: 2rem;
        }
    }
    // .orders__item
    &__item {
        width: 100%;
    }
}
</style>
