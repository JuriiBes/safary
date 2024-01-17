<template>
    <div class="footer__subscribe subscribe">
        <div class="subscribe__title">Subscribe to our newsletter</div>
        <form action="#" class="subscribe__form form">
            <label for="e-mail" class="form__label">
                <input id="e-mail" type="email" class="form__input" placeholder="Email Address" />
            </label>
            <button type="submit" class="form__button">ok</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'FooterSubscribe',
}
</script>

<style lang="scss" scoped>
.footer {
    // .footer__subscribe
    &__subscribe {
        display: flex;
        flex-direction: column;
        row-gap: 1.4375rem;
        align-items: flex-start;
        justify-content: center;
        @media (max-width: 35.9375rem) {
            row-gap: 0.8rem;
        }
    }
}
.subscribe {
    // .subscribe__title
    &__title {
    }
    // .subscribe__form
    &__form {
    }
}
.form {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    // .form__label
    &__label {
    }
    // .form__input
    &__input {
        width: 13.125rem;
        padding: 0.8125rem 1.25rem;
        background-color: transparent;
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
        border: 1px solid #ed165f;
        outline: none;
    }
    // .form__button
    &__button {
        text-transform: uppercase;
        color: #f5f5f5;
        background-color: #ed165f;
        padding: 0.8125rem 1.25rem;
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
        // border: 1px solid #ed165f;
        transition: 0.3s;
        @media (min-width: 992px) {
            &:hover {
                background-color: rgba(237, 22, 94, 0.7);
            }
        }
    }
}
</style>
