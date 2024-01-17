<template>
    <div class="colors">
        <div class="colors__header">
            <div class="colors__title">Color</div>
            <button type="button" class="colors__clear-filter" @click="clearFilter">Clear <span>x</span></button>
        </div>

        <div class="colors__checkbox">
            <label
                v-for="(color, index) in colorsData"
                :key="index"
                :class="['colors__label', checkedColor(color.color)]"
            >
                <input
                    v-model="selectedColors"
                    name="colors"
                    type="checkbox"
                    :value="color.color"
                    class="colors__input"
                />
                <span
                    :style="{ background: color.colorCode }"
                    :class="['colors__color', { white: color.color === 'White' }]"
                ></span>
                {{ color.color }}
            </label>
        </div>
    </div>
</template>

<script>
import { filterColors } from '@/data/colors-filter.js'

export default {
    name: 'FilterColor',
    emits: ['color'],
    data() {
        return {
            selectedColors: [],
            colorsData: filterColors,
        }
    },

    watch: {
        selectedColors: {
            handler(newValue) {
                this.$emit('color', newValue)
            },
            deep: true,
        },
    },
    methods: {
        clearFilter() {
            this.selectedColors = []
        },
        checkedColor(color) {
            let selected = this.selectedColors.includes(color)
            if (selected === true) return 'selected'
            return 'not-select'
        },
    },
}
</script>

<style lang="scss" scoped>
.colors {
    // .colors__header
    &__header {
        padding: 2rem 0 1rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: space-between;
    }
    // .colors__title
    &__title {
        color: #000;
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 1;
        text-transform: uppercase;
    }
    // .colors__clear-filter
    &__clear-filter {
        color: #c4c4c4;
        font-size: 0.875rem;
        font-weight: 600;
        line-height: 1.28; /* 128.571% */
    }
    // .colors__checkbox
    &__checkbox {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        padding: 2rem 0;
    }
    // .colors__label
    &__label {
        display: flex;
        align-items: center;
        column-gap: 0.4375rem;
        cursor: pointer;
        transition: 0.3s;
        @media (min-width: 992px) {
            &:hover {
                color: #ed165f;
            }
        }
    }
    // .colors__input
    &__input {
        display: none;
    }
    // .colors__color
    &__color {
        width: 2rem;
        height: 2rem;
        border-radius: 2px;
    }
}

.selected {
    color: #ed165f;
}
.not-select {
    color: #000;
}
.white {
    border: 1px solid rgba(0, 0, 0, 0.5);
}
</style>
