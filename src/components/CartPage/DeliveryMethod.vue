<template>
    <div class="checkout__delivery delivery">
        <h2 class="delivery__title">
            <font-awesome-icon :icon="['fas', 'circle-check']" class="delivery__icon" />Delivery method
        </h2>
        <div class="delivery__address-list">
            <label v-for="(item, index) in deliveryData" :key="index" class="delivery__label">
                <input name="delivery-price" type="radio" :checked="index == 0" @click="checkedDelivery(index)" />
                <div class="delivery__info">
                    <p>₦ {{ item.deliveryPrice }}</p>
                    <p>Delivery fee</p>
                    <p>{{ item.deliveryMethod }}</p>
                </div>
            </label>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useUserAccountStore } from '@/store/useUserAccountStore'
import { deliveryMethods } from '@/data/data-delivery-methods'
export default {
    name: 'DeliveryMethod',
    data() {
        return {
            deliveryData: deliveryMethods,
        }
    },
    created() {
        this.addDeliveryMethodToCart(this.deliveryData[0])
    },
    methods: {
        ...mapActions(useUserAccountStore, ['addDeliveryMethodToCart']),
        checkedDelivery(index) {
            this.addDeliveryMethodToCart(this.deliveryData[index])
        },
    },
}
</script>

<style lang="scss" scoped>
.checkout {
    // .checkout__delivery
    &__delivery {
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
.delivery {
    // .delivery__title
    &__title {
        font-size: 1.25rem;
        font-weight: 800;
        line-height: 1.02;
        text-align: start;
    }
    // .delivery__icon
    &__icon {
        font-size: 1rem;
        color: #ed165f;
        padding-right: 0.4375rem;
    }
    // .delivery__address-list
    &__address-list {
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
    }
    // .delivery__label
    &__label {
        display: flex;
        flex-wrap: nowrap;

        column-gap: 0.9375rem;
        align-items: flex-start;
    }
    // .delivery__info
    &__info {
        display: flex;
        flex-wrap: nowrap;
        column-gap: 1.9375rem;
        font-family: Roboto;
        align-items: flex-start;
        flex: 1 1 auto;
        @media (max-width: 1050px) {
            column-gap: 1rem;
        }
    }
}
</style>
