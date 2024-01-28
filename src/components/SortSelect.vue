<template>
    <div class="sort-by">
        <div id="select-body" class="select__custom">
            <div :class="['select__title', selectTitleBorder]" @click="selectedOptions">
                Sort by:
                <div class="select__main-line">
                    {{ titleSelect }}
                    <div :class="['select__arrow', animationArrow]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
                            <path d="M10 1L5.5 5.5L1 0.999999" stroke="black" />
                        </svg>
                    </div>
                </div>
            </div>

            <div :class="['select__options-body', 'options', visibleOptions]">
                <div
                    v-for="(option, index) in dataOptions"
                    :key="index"
                    class="options__element"
                    @click="selectElement(option.nameOption, option.valueOption)"
                >
                    {{ option.nameOption }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { optionsDataForSelect } from '@/data/select-sort-by'
export default {
    name: 'SortSelect',
    emits: ['sort-product'],
    data() {
        return {
            titleSelect: 'Most popular',
            parameterForSortingProductList: 'popular',
            dataOptions: optionsDataForSelect,
            animationArrow: null,
            visibleOptions: null,
            selectTitleBorder: null,
        }
    },
    watch: {
        parameterForSortingProductList(newValue) {
            this.$emit('sort-product', newValue)
        },
    },
    methods: {
        selectElement(title, value) {
            this.titleSelect = title
            this.parameterForSortingProductList = value
            this.visibleOptions = null
            this.animationArrow = null
            this.selectTitleBorder = null
        },
        selectedOptions() {
            this.closeClickOutsideSelect()
            if (this.visibleOptions === null) {
                this.animationArrow = 'arrow-animation'
                this.visibleOptions = 'option-visible'
                this.selectTitleBorder = 'select-title-border'
            } else {
                this.visibleOptions = null
                this.animationArrow = null
                this.selectTitleBorder = null
            }
        },
        closeClickOutsideSelect() {
            document.documentElement.addEventListener('click', this.closeSelect)
        },
        closeSelect(event) {
            let mouseX = event.pageX
            let mouseY = event.pageY
            let bodyElement = document.getElementById('select-body').getBoundingClientRect()

            if (
                mouseX < bodyElement.left ||
                mouseX > bodyElement.right ||
                mouseY < bodyElement.top ||
                mouseY > bodyElement.bottom
            ) {
                this.visibleOptions = null
                this.animationArrow = null
                this.selectTitleBorder = null
                document.documentElement.removeEventListener('click', this.closeSelect)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.sort-by {
    display: flex;
    justify-content: flex-end;
    padding: 0 25px 6px;
    @media (max-width: 991.98px) {
        padding: 0 0 6px;
    }
}
.select {
    // .select__custom
    &__custom {
        display: flex;
        flex-direction: column;
        // flex-wrap: nowrap;
        row-gap: 0;
        border: 1px solid #000;
        font-size: 14px;
        font-weight: 600;
        line-height: 1.28;
        letter-spacing: 0.2px;
        padding: 9px 4px 0;
        box-sizing: border-box;
        position: relative;
        min-width: 210px;
    }
    // .select__title
    &__title {
        display: flex;
        column-gap: 6px;
        padding: 0 15px 9px;
    }

    // .select__main-line
    &__main-line {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        column-gap: 8px;
    }
    // .select__arrow
    &__arrow {
        display: flex;
        align-items: center;
        transition: 0.3s;
        height: 7px;
        transition: all ease 0.3s;
    }
    // .select__options-body
    &__options-body {
    }
}
.options {
    position: absolute;
    z-index: 1;
    top: 100%;
    right: -1px;
    width: 100%;
    opacity: 0;
    pointer-events: none;
    background-color: #fff;
    transition: all ease 0.3s;
    border-right: 1px solid #000;
    border-left: 1px solid #000;
    border-bottom: 1px solid #000;
    box-sizing: content-box;
    // .options__element
    &__element {
        text-align: start;
        padding: 9px 25px;
        transition: 0.1s;
        @media (min-width: 992px) {
            &:hover {
                color: #fff;
                background-color: #ed165f;
            }
        }
    }
}
.option-visible {
    opacity: 1;
    pointer-events: visible;
}

.arrow-animation {
    transform: rotate(180deg);
}
.select-title-border {
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    padding-bottom: 8px;
}
</style>
