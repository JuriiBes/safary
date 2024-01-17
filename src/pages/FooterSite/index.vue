<template>
    <footer class="footer">
        <div class="footer__container">
            <div class="footer__body">
                <div class="footer__logo">
                    <img :src="require('@/assets/logo/logo.svg')" alt="logo" />
                </div>
                <div class="footer__submenu">
                    <footer-menu />
                </div>
                <div class="footer__social">
                    <footer-social />
                </div>
                <div class="footer__subscribe">
                    <footer-subscribe />
                </div>
                <div class="footer__contact">
                    <a href="https://maps.app.goo.gl/w6HnodwLd7hdjMH48" target="_blank">
                        497 Evergreen Rd.Roseville, CA 95673</a
                    >
                    <a href="tel:+44345678903">+44 345 678 903</a>
                    <a href="mailto:adobexd@gmail.com">adobexd@gmail.com</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import FooterMenu from '@/pages/FooterSite/FooterMenu.vue'
import FooterSocial from '@/pages/FooterSite/FooterSocial.vue'
import FooterSubscribe from '@/pages/FooterSite/FooterSubscribe.vue'
export default {
    name: 'FooterSite',
    components: {
        FooterMenu,
        FooterSocial,
        FooterSubscribe,
    },
}
</script>

<style lang="scss" scoped>
.footer {
    background-color: #f5f5f5;
    padding: 4.0625rem 0;
    @media (max-width: 43.125rem) {
        padding: 2rem 0;
    }
    // .footer__container
    &__container {
    }
    // .footer__body
    &__body {
        display: flex;
        justify-content: space-between;
        column-gap: 5rem;
        @media (max-width: 75rem) {
            column-gap: 2rem;
        }
        @media (max-width: 61.9875rem) {
            flex-wrap: wrap;
            row-gap: 2rem;
        }
        @media (max-width: 36.875rem) {
            column-gap: 1rem;
            flex-direction: column;
            align-items: center;
        }
    }
    // .footer__logo
    &__logo {
    }
    // .footer__submenu
    &__submenu {
    }
    // .footer__social
    &__social {
    }
    // .footer__subscribe
    &__subscribe {
        flex: 1 1 auto;
        @media (max-width: 75rem) {
            flex: 0 0 auto;
        }
    }
    // .footer__contact
    &__contact {
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
        align-items: self-start;
        & a {
            transition: 0.25s;
        }
        @media (min-width: 992px) {
            & a:hover {
                color: #ed165f;
            }
        }
    }
}
</style>
