<template>
    <div class="checkout__delivery delivery">
        <h2 class="delivery__title">
            <font-awesome-icon :icon="['fas', 'circle-check']" class="delivery__icon" />Shipping Address
        </h2>
        <div class="delivery__address-list">
            <label v-for="(address, index) in dataAddress" :key="index" class="delivery__label">
                <input name="delivery-address" type="radio" :checked="index == 0" @click="checkedAddress(index)" />
                <div class="delivery__info">
                    <p>{{ address.fullName }}</p>
                    <p>Address: {{ address.address.numberHouse }}, {{ address.address.street }}</p>
                    <p>City: {{ address.city }}</p>
                    <p>State: {{ address.state }}</p>
                </div>
            </label>
        </div>
        <div class="delivery__button">
            <button type="button" class="delivery__add">add new address</button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useUserAccountStore } from '@/store/useUserAccountStore'
export default {
    name: 'ShoppingAddress',
    props: {
        dataAddress: {
            type: Array,
            default: () => [],
        },
    },
    created() {
        this.addDeliveryAddressToCart({
            nameClient: this.dataAddress[0].fullName,
            address:
                this.dataAddress[0].address.numberHouse +
                ', ' +
                this.dataAddress[0].address.street +
                ', ' +
                this.dataAddress[0].address.cityRegion +
                ' ' +
                this.dataAddress[0].city +
                '.',
        })
    },
    methods: {
        ...mapActions(useUserAccountStore, ['addDeliveryAddressToCart']),
        checkedAddress(index) {
            this.addDeliveryAddressToCart({
                nameClient: this.dataAddress[index].fullName,
                address:
                    this.dataAddress[index].address.numberHouse +
                    ', ' +
                    this.dataAddress[index].address.street +
                    ', ' +
                    this.dataAddress[index].address.cityRegion +
                    ' ' +
                    this.dataAddress[index].city +
                    '.',
            })
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
        flex: 1 1 auto;
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
        flex-direction: column;
        column-gap: 0.5rem;
        font-family: Roboto;
        line-height: 1.2;
        align-items: flex-start;
    }
    // .delivery__button
    &__button {
    }
    // .delivery__add
    &__add {
        display: flex;
        color: #fff;
        text-align: center;
        font-size: 1rem;
        font-weight: 800;
        line-height: 1.33;
        letter-spacing: 0.125rem;
        text-transform: uppercase;
        border-radius: 0.375rem;
        background: #ed165f;
        padding: 0.75rem 2.9375rem;
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
</style>
