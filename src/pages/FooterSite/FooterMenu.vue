<template>
    <div class="footer__menu menu">
        <router-link to="/about" class="menu__item">About Us</router-link>
        <router-link to="/contacts" class="menu__item">Contacts</router-link>
        <router-link to="/conditions" class="menu__item">Terms & Conditions</router-link>
    </div>
</template>

<script>
export default {
    name: 'FooterMenu',
}
</script>

<style lang="scss" scoped>
.footer {
    // .footer__menu
    &__menu {
    }
}
.menu {
    display: flex;
    flex-direction: column;
    row-gap: 0.8125rem;
    align-items: flex-start;
    @media (max-width: 35.9375rem) {
        flex-direction: row;
        column-gap: 2rem;
    }
    @media (max-width: 337px) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 1rem;
    }
    // .menu__item
    &__item {
        transition: 0.25s;
        @media (min-width: 992px) {
            &:hover {
                color: #ed165f;
            }
        }
    }
}
</style>
