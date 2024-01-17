<template>
    <div class="price">
        <div class="price__header">
            <div class="price__title">Price</div>
            <button type="button" class="price__clear-filter" @click="clearFilter">Clear <span>x</span></button>
        </div>

        <div class="price__checkbox">
            <label
                v-for="(price, index) in priceData"
                :key="index"
                :class="['price__label', { selected: select == index }]"
                @click="checkedPrice(price, index)"
            >
                <input name="price" type="radio" value="price" class="price__input" />
                ₦ {{ price.minValue }} - ₦ {{ price.maxValue }}
            </label>
        </div>
        <div class="price__user-value">
            <label class="price__user-label">
                <input v-model="userPriceValue.minValue" type="number" placeholder="₦" class="price__user-input"
            /></label>
            <p>to</p>
            <label class="price__user-label">
                <input v-model="userPriceValue.maxValue" type="number" placeholder="₦" class="price__user-input"
            /></label>
            <button type="button" class="price__button" @click="filterPriceUserValue">Apply</button>
        </div>
    </div>
</template>

<script>
import { dataPrice } from '@/data/price-filter.js'
export default {
    name: 'FilterPrice',
    emits: ['price'],
    data() {
        return {
            priceData: dataPrice,
            userPriceValue: {
                minValue: null,
                maxValue: null,
            },
            select: null,
        }
    },
    methods: {
        checkedPrice(value, index) {
            this.$emit('price', value)
            this.select = index
        },
        filterPriceUserValue() {
            this.$emit('price', this.userPriceValue)
            this.userPriceValue = {}
            this.select = null
        },
        clearFilter() {
            this.select = null
            this.userPriceValue = {}
            this.$emit('price', this.userPriceValue)
        },
    },
}
</script>

<style lang="scss" scoped>
.price {
    // .price__header
    &__header {
        padding: 2rem 0 1rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: space-between;
    }
    // .price__title
    &__title {
        color: #000;
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 1;
        text-transform: uppercase;
    }
    // .price__clear-filter
    &__clear-filter {
        color: #c4c4c4;
        font-size: 0.875rem;
        font-weight: 600;
        line-height: 1.28; /* 128.571% */
    }
    // .price__checkbox
    &__checkbox {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 2rem 0 0.75rem;
    }
    // .price__label
    &__label {
        display: flex;
        align-items: center;
        column-gap: 0.4375rem;
        cursor: pointer;
        color: #000;
        font-size: 14px;
        font-weight: 700;
        line-height: 1.28;
        transition: 0.3s;
        &:before {
            content: '';
            width: 27px;
            height: 27px;
            border: 0.5px solid rgba(0, 0, 0, 0.5);
            transition: 0.3s;
            background-color: #fff;
        }
        &:hover {
            color: #ed165f;
        }
    }
    // .price__input
    &__input {
        display: none;
        &:checked {
        }
    }
    // .price__user-value
    &__user-value {
        display: flex;
        flex-wrap: nowrap;
        column-gap: 1rem;
        align-items: center;
        font-size: 14px;
        font-weight: 700;
        line-height: 1.28;
    }
    // .price__user-label
    &__user-label {
    }
    // .price__user-input
    &__user-input {
        padding: 4px;
        width: 80px;
        height: 27px;
        border: 0.5px solid rgba(0, 0, 0, 0.5);
        &::placeholder {
            color: #000;
        }
    }
    // .price__button
    &__button {
        padding: 5px 14px;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        line-height: normal;
        border-radius: 2px;
        background: #ed165f;
        transition: 0.3s;
        @media (min-width: 992px) {
            &:hover {
                background-color: rgba(237, 22, 94, 0.7);
            }
        }
    }
}
.selected {
    &:before {
        background-color: #ed165f;
    }
}
</style>
