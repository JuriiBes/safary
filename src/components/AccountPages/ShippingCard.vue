<template>
    <div class="shipping">
        <div class="shipping__info">
            <p>{{ shippingAddress.fullName }}</p>
            <p>
                {{ shippingAddress.address.numberHouse }} {{ shippingAddress.address.street }},
                {{ shippingAddress.address.cityRegion }}, {{ shippingAddress.city }}
            </p>
            <p>{{ shippingAddress.city }}/{{ shippingAddress.region }}</p>
            <p>{{ shippingAddress.state }}</p>
            <p>{{ shippingAddress.telephone }}</p>
        </div>
        <div class="shipping__buttons">
            <button type="button" class="shipping__button" @click="editAddress">Edit</button>
            <button type="button" class="shipping__button" @click="deleteAddress">Delete</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShippingCard',

    props: {
        shippingAddress: {
            type: Object,
            default: () => ({}),
        },
    },
    emits: ['edit', 'delete'],
    methods: {
        editAddress() {
            this.$emit('edit')
        },
        deleteAddress() {
            this.$emit('delete')
        },
    },
}
</script>

<style lang="scss" scoped>
.shipping {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    width: 100%;

    // .shipping__info
    &__info {
        display: flex;
        flex-direction: column;
        row-gap: 0.25rem;
        font-size: 14px;
        line-height: 1.28;
        letter-spacing: 0.2px;
        & p {
            text-align: start;
        }
    }
    // .shipping__buttons
    &__buttons {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        column-gap: 4.0625rem;
        align-items: center;
        justify-content: flex-end;
    }
    // .shipping__button
    &__button {
        color: #ed165f;
        font-size: 14px;
        font-weight: 700;
        line-height: 1.28;
        letter-spacing: 0.2px;
    }
}
</style>
