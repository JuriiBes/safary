<template>
    <div class="order-card__products product">
        <div class="product__body">
            <div class="product__image">
                <img :src="productData.urlAddress" alt="img" />
            </div>
            <div class="product__data">
                <h3 class="product__title">{{ productData.nameProduct }}</h3>
                <!-- <div class="product__size">Size - {{ productOrder.size }}</div> -->
                <div class="product__price">₦ {{ productData.price }}</div>
                <div class="product__quantity">
                    <span>Qty:</span>
                    <quantity-count :value-quantity="cartDataItem.quantity" @count="valueQuantity" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'pinia'
import { useMainPageStore } from '@/store/useMainPageStore'
import QuantityCount from '@/components/QuantityCount.vue'
export default {
    name: 'CardItemBySummary',
    components: {
        QuantityCount,
    },
    props: {
        cartDataItem: {
            type: Object,
            default: () => ({}),
        },
    },
    emits: ['totalItem'],
    data() {
        return {
            productData: null,
        }
    },
    computed: {
        ...mapState(useMainPageStore, ['getProductByNumberId']),
    },
    created() {
        this.productData = this.getProductByNumberId(this.cartDataItem.idProduct)
        this.valueQuantity(this.cartDataItem.quantity)
    },
    methods: {
        valueQuantity(value) {
            let subtotal = this.productData.price * value
            this.$emit('totalItem', {
                idProduct: this.productData.id,
                total: subtotal,
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.product {
    display: flex;
    flex-direction: column;
    row-gap: 4rem;
    @media (max-width: 1150px) {
        row-gap: 1rem;
    }
    @media (max-width: 991.98px) {
        box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
        padding: 5px;
    }

    // .product__body
    &__body {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        column-gap: 2rem;
        align-items: center;
        @media (max-width: 400px) {
            column-gap: 1rem;
        }
    }
    // .product__image
    &__image {
        position: relative;
        width: 5.4375rem;
        height: 7.625rem;
        overflow: hidden;
        flex-shrink: 0;
        & img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    // .product__data
    &__data {
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
        align-items: self-start;
        flex: 1 1 auto;
    }
    // .product__title
    &__title {
        color: #000;
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 1.02;
        letter-spacing: 0.2px;
        text-align: start;
        @media (max-width: 400px) {
            font-size: 1.1rem;
            letter-spacing: 0;
        }
    }
    // .product__size
    &__size {
        color: #686868;
        font-weight: 600;
        line-height: 1.12;
        letter-spacing: 0.2px;
    }
    // .product__price
    &__price {
        color: #ed165f;
        font-family: Roboto;
        font-size: 14px;
    }
    // .product__quantity
    &__quantity {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        column-gap: 5px;
        font-size: 14px;
    }
}
</style>
