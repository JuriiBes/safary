<template>
    <div class="counter">{{ getCountCartItems(optionsData) }}</div>
</template>

<script>
import { mapState } from 'pinia'
import { useUserAccountStore } from '@/store/useUserAccountStore'
export default {
    name: 'CounterItems',
    props: {
        optionsData: {
            type: String,
            default: '',
            require: true,
        },
    },

    computed: {
        ...mapState(useUserAccountStore, ['getCountCartItems']),
    },
}
</script>

<style lang="scss" scoped>
.counter {
    position: absolute;
    display: flex;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: #fff;
    background-color: rgba(237, 22, 94, 0.7);
    border-radius: 50%;
}
</style>
