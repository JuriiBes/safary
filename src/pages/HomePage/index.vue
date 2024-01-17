<template>
    <welcome-part />
    <shop-style-page />
</template>

<script>
import WelcomePart from './WelcomePart/WelcomePart'
import ShopStylePage from './ShopStylePage/ShopStylePage'
export default {
    name: 'HomePage',
    components: {
        WelcomePart,
        ShopStylePage,
    },
}
</script>

<style lang="scss" scoped></style>
