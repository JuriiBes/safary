<template>
    <header-site />
    <main>
        <router-view />
    </main>
    <footer-site />
</template>

<script>
import HeaderSite from '@/pages/HeaderSite/index.vue'
import FooterSite from '@/pages/FooterSite/index.vue'
export default {
    components: {
        HeaderSite,
        FooterSite,
    },
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Mulish:regular,600,700,800&display=swap');
@import url('https://fonts.googleapis.com/css?family=Roboto:regular&display=swap');
@import url('./scss/_reset.scss');

#app {
    font-family: Mulish, Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-size: 0.875rem;
    color: #000;
    font-weight: 400;
    min-height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    scroll-behavior: smooth;
}
[class*='__container'] {
    max-width: 81.25rem;
    padding: 0 0.9375rem;
    margin: 0 auto;
}
main {
    flex: 1 1 auto;
}
.active-scroll {
    overflow-y: none;
}
</style>
