<template>
    <div class="sizes">
        <div class="sizes__header">
            <div class="sizes__title">Size</div>
            <button type="button" class="sizes__clear-filter" @click="clearFilter">Clear <span>x</span></button>
        </div>

        <div class="sizes__checkbox">
            <label v-for="(size, index) in sizesData" :key="index" :class="['sizes__label', checkedSize(size)]">
                <input
                    v-model="selectedSize"
                    name="sizes"
                    type="checkbox"
                    :value="readerValue(size)"
                    class="sizes__input"
                />
                {{ size }}
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FilterSize',
    props: {
        sizesData: {
            type: Array,
            default: () => [],
        },
    },
    emits: ['size'],
    data() {
        return {
            selectedSize: [],
        }
    },
    watch: {
        selectedSize: {
            handler(newValue) {
                this.$emit('size', newValue)
            },
            deep: true,
        },
    },
    methods: {
        clearFilter() {
            this.selectedSize = []
        },
        checkedSize(value) {
            let checkSize = this.readerValue(value)
            let selected = this.selectedSize.includes(checkSize)
            if (selected === true) return 'selected'
            return 'not-select'
        },
        readerValue(value) {
            let arrayElementsValue = value.match(/\d|\w/gi)
            return arrayElementsValue.join('')
        },
    },
}
</script>

<style lang="scss" scoped>
.sizes {
    // .sizes__header
    &__header {
        padding: 2rem 0 1rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: space-between;
    }
    // .sizes__title
    &__title {
        color: #000;
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 1;
        text-transform: uppercase;
    }
    // .sizes__clear-filter
    &__clear-filter {
        color: #c4c4c4;
        font-size: 0.875rem;
        font-weight: 600;
        line-height: 1.28; /* 128.571% */
    }
    // .sizes__checkbox
    &__checkbox {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        padding: 2rem 0;
    }
    // .sizes__label
    &__label {
        display: flex;
        align-items: center;
        column-gap: 0.4375rem;
        min-width: 3.375rem;
        height: 2rem;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-radius: 2px;
        background-color: transparent;
        transition: 0.2s;
        padding: 2px 3px;
        cursor: pointer;
        @media (min-width: 992px) {
            &:hover {
                color: #df91ab;
            }
        }
    }
    // .sizes__input
    &__input {
        display: none;
    }
}

.selected {
    background-color: #ed165f;
    color: #fff;
}
.not-selected {
    background-color: transparent;
    color: #000;
}
</style>
