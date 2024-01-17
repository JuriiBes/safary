<template>
    <div class="user-address">
        <h2 class="user-address__title">Address Book</h2>
        <div class="user-address__body">
            <div v-for="(shippingItem, index) in userAddress" :key="index" class="user-address__item">
                <h3 class="user-address__subtitle">
                    <p v-if="index === 0">Default</p>
                    Shipping Address
                </h3>
                <shipping-card
                    :shipping-address="shippingItem"
                    @edit="editAddress(index)"
                    @delete="deleteAddress(index)"
                />
            </div>
        </div>
        <div class="user-address__button-body">
            <button type="button" class="user-address__button-add">ADD NEW ADDRESS</button>
        </div>
    </div>
</template>

<script>
import ShippingCard from '@/components/AccountPages/ShippingCard.vue'
import { mapActions, mapState } from 'pinia'
import { useUserAccountStore } from '@/store/useUserAccountStore'
export default {
    name: 'AddressBook',
    components: {
        ShippingCard,
    },
    data() {
        return {
            userAddress: null,
            detailName: 'postAddress',
        }
    },
    computed: {
        ...mapState(useUserAccountStore, ['getUserDataDetail']),
    },
    created() {
        this.userAddress = this.getUserDataDetail(this.detailName)
    },
    methods: {
        ...mapActions(useUserAccountStore, ['deleteShippingAddress']),
        deleteAddress(index) {
            this.deleteShippingAddress(index)
        },
    },
}
</script>

<style lang="scss" scoped>
.user-address {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    // .user-address__title
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
    // .user-address__body
    &__body {
        padding: 3.625rem 4rem 2.875rem;
        box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        row-gap: 2rem;
        align-items: flex-start;
        @media (max-width: 991.98px) {
            padding: 2rem 1.5rem;
        }
        @media (max-width: 450px) {
            padding: 1rem 0.5rem;
        }
    }
    // .user-address__item
    &__item {
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        width: 100%;
    }
    // .user-address__subtitle
    &__subtitle {
        display: flex;
        flex-direction: row;
        column-gap: 0.375rem;
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 1.1;
        letter-spacing: 0.2px;
        @media (max-width: 991.98px) {
            font-size: 1.15rem;
        }
    }
    // .user-address__inputs
    &__inputs {
        display: flex;
        flex-direction: column;
        row-gap: 2rem;
    }
    // .user-information__label

    // .user-address__button-body
    &__button-body {
        text-align: start;
        @media (max-width: 687.98px) {
            display: flex;
            justify-content: flex-end;
        }
    }
    // .user-address__button-add
    &__button-add {
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
