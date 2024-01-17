<template>
    <div class="categories">
        <div class="categories__title">Category</div>
        <div class="categories__checkbox">
            <label
                v-for="(category, index) in arrayData"
                :key="index"
                :class="['categories__label', { selected: select === index }]"
                @click="checkedCategory(category, index)"
            >
                <input name="category" type="radio" :value="category" class="categories__input" />
                {{ category }}
            </label>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FilterCategory',
    props: {
        arrayData: {
            type: Array,
            default: () => [],
        },
    },
    emits: ['category'],

    data() {
        return {
            select: 0,
        }
    },
    methods: {
        checkedCategory(value, index) {
            this.select = index
            this.$emit('category', value)
        },
    },
}
</script>

<style lang="scss" scoped>
.categories {
    // .categories__title
    &__title {
        color: #000;
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 1.125rem; /* 90% */
        padding: 0.6rem 0 1rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
        text-align: start;
        text-transform: uppercase;
    }
    // .categories__checkbox
    &__checkbox {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 1.5rem 0;
    }
    // .categories__label
    &__label {
        width: 100%;
        padding: 8px 4px;
        text-align: start;
        color: #686868;
        font-weight: 600;
        line-height: 1.12;
        cursor: pointer;
        transition: all ease 0.2s;
        @media (min-width: 992px) {
            &:hover {
                transform: translateX(5px);
            }
        }
    }
    // .categories__input
    &__input {
        display: none;
    }
}
.selected {
    color: #ed165f;
}
</style>
