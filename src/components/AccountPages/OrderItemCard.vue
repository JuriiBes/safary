<template>
    <div class="order-card">
        <div class="order-card__products product">
            <div v-for="(productOrder, index) in orderItemData.productList" :key="index" class="product__body">
                <div class="product__image">
                    <img :src="getProductData(productOrder.idProduct, 'urlAddress')" alt="img" />
                </div>
                <div class="product__data">
                    <h3 class="product__title">{{ getProductData(productOrder.idProduct, 'nameProduct') }}</h3>
                    <div class="product__size">Size - {{ productOrder.size }}</div>
                    <div class="product__price">₦ {{ productOrder.price }}</div>
                    <div class="product__quantity">Qty: {{ productOrder.quantity }}</div>
                    <div class="product__date-order">On {{ productOrder.dateOrder }}</div>
                </div>
            </div>
        </div>
        <div class="order-card__payment payment">
            <h3 class="payment__title">Payment details</h3>
            <div class="payment__products">Item's total - ₦ {{ totalSumItemsProducts() }}</div>
            <div class="payment__delivery">Delivery fee - ₦ {{ orderItemData.delivery.deliveryPrice }}</div>
            <div class="payment__total">TOTAL - ₦ {{ totalSumOrder() }}</div>
        </div>
        <div class="order-card__delivery delivery">
            <div class="delivery__method">
                <h3>Delivery method</h3>
                <p>{{ orderItemData.delivery.deliveryMethod }}</p>
            </div>
            <div class="delivery__method">
                <h3>Shipping address</h3>
                <p>{{ orderItemData.delivery.deliveryAddress.nameClient }}</p>
                <p>{{ orderItemData.delivery.deliveryAddress.address }}</p>
            </div>
            <div :class="['delivery__status', statusDelivery(orderItemData.delivery.deliveryStatus)]">
                {{ orderItemData.delivery.deliveryStatus }}
            </div>
        </div>
    </div>
    <div v-if="orderItemData.delivery.deliveryStatus.toLowerCase() == 'delivered'" class="button">
        <button type="button" class="button__again" @click="addToCartPositionWithOrder">ORDER AGAIN</button>
        <button type="button" class="button__return">REQUEST A RETURN</button>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useMainPageStore } from '@/store/useMainPageStore'
import { useUserAccountStore } from '@/store/useUserAccountStore'

export default {
    name: 'OrderItemCard',
    props: {
        orderItemData: {
            type: Object,
            default: () => ({}),
        },
    },

    computed: {
        ...mapState(useMainPageStore, ['getProductByNumberId']),
        ...mapState(useUserAccountStore, ['getIncludesProductInCart']),
    },
    methods: {
        ...mapActions(useUserAccountStore, ['addToCartPositionsWithOrderOrFavorites']),
        numRun() {
            return (this.num += 1)
        },
        totalSumItemsProducts() {
            return this.orderItemData.productList.reduce(
                (totalSum, product) => (totalSum += product.quantity * product.price),
                0
            )
        },
        totalSumOrder() {
            return this.totalSumItemsProducts() + this.orderItemData.delivery.deliveryPrice
        },
        getProductData(idProduct, nameOptions) {
            return this.getProductByNumberId(idProduct)[nameOptions]
        },
        statusDelivery(status) {
            return status.toLowerCase() == 'delivered' ? 'status__delivered' : 'status__to-arrive'
        },
        addToCartPositionWithOrder() {
            let dataProductsWithOrder = []
            for (const product of this.orderItemData.productList) {
                if (this.getIncludesProductInCart(product.idProduct) < 0) {
                    let itemToCart = {
                        idProduct: product.idProduct,
                        quantity: product.quantity,
                        size: product.size,
                    }
                    dataProductsWithOrder.push(itemToCart)
                }
            }
            if (dataProductsWithOrder.length > 0) this.addToCartPositionsWithOrderOrFavorites(dataProductsWithOrder)
            this.$router.push({ name: 'cart' })
        },
    },
}
</script>

<style lang="scss" scoped>
.order-card {
    display: grid;
    grid-template-columns: 48% 1fr 1fr;
    width: 100%;
    column-gap: 0.0625rem;
    &:not(:last-child) {
        margin-bottom: 2.75rem;
    }
    @media (max-width: 1150px) {
        grid-template-columns: 1fr 1fr;
        &:not(:last-child) {
            margin-bottom: 1.5rem;
        }
    }
    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }

    // .order-card__products
    &__products {
        flex: 1 1 auto;
        padding: 2.1875rem 2rem 1.75rem;
        box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
        @media (max-width: 1250px) {
            padding: 2.1875rem 1rem 1.75rem;
        }
        @media (max-width: 1150px) {
            grid-column: 1/3;
            padding: 1.5rem 1rem;
        }
        @media (max-width: 500px) {
            grid-column: 1/2;
            padding: 1rem 0.5rem;
        }
    }

    // .order-card__payment
    // .order-card__delivery
    &__payment,
    &__delivery {
        padding: 2.1875rem 2rem 1.75rem;
        box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        row-gap: 0.25rem;
        align-items: flex-start;
        @media (max-width: 1250px) {
            padding: 2.1875rem 1rem 1.75rem;
        }
        @media (max-width: 1150px) {
            padding: 1rem;
        }
        @media (max-width: 500px) {
            padding: 1rem 0.5rem;
        }
    }
}
.product {
    display: flex;
    flex-direction: column;
    row-gap: 4rem;
    @media (max-width: 1150px) {
        row-gap: 1rem;
    }

    // .product__body
    &__body {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        column-gap: 2rem;
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
    // .product__date-order
    &__quantity,
    &__date-order {
        font-size: 14px;
    }
}
.payment {
    // .payment__title
    &__title {
        font-weight: 600;
        line-height: 1.5;
    }
    // .payment__products
    // .payment__delivery
    // .payment__total
    &__products,
    &__delivery,
    &__total {
        color: #686868;
        font-size: 12px;
        font-weight: 600;
        line-height: 1.4;
        text-align: start;
    }
}
.delivery {
    position: relative;
    row-gap: 1.25rem;
    // .delivery__method

    &__method {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        row-gap: 0.25rem;
        & h3 {
            font-weight: 600;
            line-height: 1.5;
        }
        & p {
            color: #686868;
            font-size: 12px;
            font-weight: 600;
            line-height: 1.4;
            text-align: start;
        }
    }
    // .delivery__status
    &__status {
        display: flex;
        position: absolute;
        top: 0;
        right: 0;
        width: 5.375rem;
        height: 2rem;
        align-items: center;
        justify-content: center;
        color: #fff;
        box-shadow: 1px -1px 5px 1px rgba(0, 0, 0, 0.1);
    }
}
.status__delivered {
    background-color: #08b727;
}
.status__to-arrive {
    background-color: #f07b4e;
}

.button {
    display: flex;
    flex-wrap: wrap;
    column-gap: 2rem;
    @media (max-width: 687.98px) {
        row-gap: 0.5rem;
        justify-content: flex-end;
    }
    // .button__again
    &__again {
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
    // .button__return
    &__return {
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
}
</style>
