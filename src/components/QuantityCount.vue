<template>
    <div class="quantity">
        <button type="button" class="quantity__reduce" @click="reduce">-</button>
        <div class="quantity__count">{{ count }}</div>
        <button type="button" class="quantity__increase" @click="increase">+</button>
    </div>
</template>

<script>
export default {
    name: 'QuantityCount',
    props: {
        valueQuantity: {
            type: Number,
            default: 1,
        },
    },
    emits: ['count'],
    data() {
        return {
            count: this.valueQuantity,
        }
    },
    methods: {
        reduce() {
            if (this.count !== 1) {
                this.count -= 1
                this.$emit('count', this.count)
            }
        },
        increase() {
            this.count += 1
            this.$emit('count', this.count)
        },
    },
}
</script>

<style lang="scss" scoped>
.quantity {
    display: flex;
    flex-wrap: nowrap;
    column-gap: 5px;
    align-items: center;
    // .quantity__reduce
    // .quantity__increase
    &__reduce,
    &__increase {
        font-size: 13px;
        font-weight: 800;
        color: #fff;
        background-color: #ed165f;
        display: flex;
        text-align: center;
        padding: 3px 5px;
        line-height: 1;
    }
    // .quantity__count
    &__count {
        font-size: 12px;
        background-color: #e1e1e1;
        width: 22px;
        padding: 4px 2px;
    }
}
</style>
