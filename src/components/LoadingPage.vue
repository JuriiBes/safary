<template>
    <div class="loading-page">
        <div class="loading-page__body">
            <div class="loading-page__text">Loading . . .</div>
            <div class="loading-page__animate-part">
                <div class="loading-page__item"></div>
                <div class="loading-page__item"></div>
                <div class="loading-page__item"></div>
                <div class="loading-page__item"></div>
                <div class="loading-page__item"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoadingPage',
}
</script>

<style lang="scss" scoped>
.loading-page {
    width: 100%;
    height: 70vh;
    display: grid;
    place-items: center;
    // .loading-page__body
    &__body {
        display: flex;
        flex-direction: column;
        // align-items: center;
        // justify-content: center;
        row-gap: 30px;
        padding: 35px 0;
    }
    // .loading-page__animate-part
    &__animate-part {
        display: flex;
        flex-wrap: nowrap;
        column-gap: 10px;
        height: 50px;
        align-items: flex-end;
    }
    // .loading-page__item
    &__item {
        width: 20px;
        height: 10px;
        background-color: #ed165f;
        &:nth-child(1) {
            -webkit-animation: animate-loading 1s ease-in 0s infinite reverse both running;
            animation: animate-loading 1s ease-in 0s infinite reverse both running;
        }
        &:nth-child(2) {
            -webkit-animation: animate-loading 1s ease-in 0.15s infinite reverse both running;
            animation: animate-loading 1s ease-in 0.15s infinite reverse both running;
        }
        &:nth-child(3) {
            -webkit-animation: animate-loading 1s ease-in 0.3s infinite reverse both running;
            animation: animate-loading 1s ease-in 0.3s infinite reverse both running;
        }
        &:nth-child(4) {
            -webkit-animation: animate-loading 1s ease-in 0.45s infinite reverse both running;
            animation: animate-loading 1s ease-in 0.45s infinite reverse both running;
        }
        &:nth-child(5) {
            -webkit-animation: animate-loading 1s ease-in 0.6s infinite reverse both running;
            animation: animate-loading 1s ease-in 0.6s infinite reverse both running;
        }
    }
    // .loading-page__text
    &__text {
        font-size: 30px;
        font-weight: 600;
        color: #ed165f;
    }
}

@keyframes animate-loading {
    0% {
        height: 10px;
    }
    50% {
        height: 50px;
    }
    100% {
        height: 10px;
    }
}
</style>
