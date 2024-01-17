<template>
    <div class="footer__social social">
        <a href="https://www.facebook.com/" target="_blank" class="social__item">
            <div class="social__icon">
                <i class="fa-brands fa-facebook-f" style="color: #ed165f"></i>
                <font-awesome-icon :icon="['fab', 'facebook-f']" style="color: #ed165f" />
            </div>
            <div class="social__title">Facebook</div>
        </a>
        <a href="https://twitter.com/" target="_blank" class="social__item">
            <div class="social__icon">
                <font-awesome-icon :icon="['fab', 'twitter']" style="color: #ed165f" />
            </div>
            <div class="social__title">Twitter</div>
        </a>
        <a href="https://www.instagram.com/" target="_blank" class="social__item">
            <div class="social__icon">
                <font-awesome-icon :icon="['fab', 'instagram']" style="color: #ed165f" />
            </div>
            <div class="social__title">Instagram</div>
        </a>
    </div>
</template>

<script>
export default {
    name: 'FooterSocial',
}
</script>

<style lang="scss" scoped>
.social {
    display: flex;
    flex-direction: column;
    row-gap: 0.8125rem;
    align-items: flex-start;
    @media (max-width: 35.9375rem) {
        flex-direction: row;
        column-gap: 3rem;
    }
    @media (max-width: 25.625rem) {
        column-gap: 1.5rem;
    }
    @media (max-width: 20.625rem) {
        column-gap: 1rem;
    }
    // .social__item
    &__item {
        display: flex;
        flex-direction: row;
        column-gap: 1.25rem;
        @media (max-width: 25.625rem) {
            column-gap: 0.8rem;
        }
        @media (min-width: 992px) {
            &:hover {
                & .social__title {
                    color: #ed165f;
                }
            }
        }
    }
    // .social__icon
    &__icon {
        width: 0.875rem;
        font-size: 0.875rem;
        justify-content: flex-start;
    }
    // .social__title
    &__title {
        transition: 0.25s;
    }
}
</style>
