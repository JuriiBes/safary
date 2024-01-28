<template>
    <header class="header">
        <div class="header__container">
            <div class="header__body">
                <nav :class="['header__nav', 'navigation', activeBurger]">
                    <router-link to="/" class="navigation__item" @click="closeBurgerMenu">Home</router-link>
                    <router-link to="/clothes" class="navigation__item" @click="closeBurgerMenu">Clothes</router-link>
                    <router-link to="/shoes" class="navigation__item" @click="closeBurgerMenu">Shoes</router-link>
                    <router-link to="/accessories" class="navigation__item" @click="closeBurgerMenu"
                        >Accessories</router-link
                    >
                </nav>
                <div class="header__logo" @click="goToHomePage">
                    <img :src="require('@/assets/logo/logo.svg')" alt="logo" />
                </div>
                <div class="header__user-side user-side">
                    <div :class="['user-side__search', activeSearch]">
                        <search-header @click-search="closeBurgerMenu" />
                    </div>
                    <div class="user-side__body">
                        <router-link to="/account" class="user-side__item" @click="closeBurgerMenu">
                            <font-awesome-icon :icon="['fas', 'user']" class="icon__account" />
                        </router-link>
                        <router-link to="/cart" class="user-side__item" @click="closeBurgerMenu">
                            <font-awesome-icon :icon="['fas', 'cart-shopping']" class="icon__cart" />
                            <counter-items :options-data="'cart'" />
                        </router-link>
                        <router-link to="/favorit" class="user-side__item" @click="closeBurgerMenu">
                            <font-awesome-icon :icon="['fas', 'heart']" class="icon__favorites" />
                            <counter-items :options-data="'favorites'"
                        /></router-link>
                    </div>
                </div>
                <div :class="['header__burger', burgerClose]" @click="menuBurger"></div>
            </div>
        </div>
    </header>
</template>

<script>
import { mapActions } from 'pinia'

import { useMainPageStore } from '@/store/useMainPageStore'
import { useUserAccountStore } from '@/store/useUserAccountStore'
import SearchHeader from '@/components/SearchHeader.vue'
import CounterItems from '@/components/CounterItems.vue'

export default {
    name: 'HeaderSite',
    components: {
        SearchHeader,
        CounterItems,
    },
    data() {
        return {
            activeBurger: null,
            activeSearch: null,
            burgerClose: null,
        }
    },
    created() {
        this.loadList()

        this.receivingUserData(0)
    },

    methods: {
        ...mapActions(useUserAccountStore, ['receivingUserData']),
        ...mapActions(useMainPageStore, ['loadList', 'aSortedListProduct', 'aListProductToRenderCard']),
        menuBurger() {
            if (!this.activeBurger) {
                this.activeBurger = 'active'
                this.activeSearch = 'active-search'
                this.burgerClose = 'burger-close'
                document.documentElement.style.overflow = 'hidden'
            } else {
                this.activeBurger = null
                this.activeSearch = null
                this.burgerClose = null
                document.documentElement.style.overflow = 'auto'
            }
        },

        closeBurgerMenu() {
            if (window.innerWidth <= 991.98 && this.burgerClose) {
                this.activeBurger = null
                this.activeSearch = null
                this.burgerClose = null
                document.documentElement.style.overflow = 'auto'
            }
        },
        goToHomePage() {
            this.$router.push({ name: 'home' })
        },
    },
}
</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    width: 100%;
    z-index: 10;
    height: 4.375rem;
    padding: 1rem 0;
    background-color: #f5f5f5;
    @media (max-width: 61.9875rem) {
        padding: 0;
        height: 3.8125rem;
        &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3.8125rem;
            z-index: 10;
            background-color: #f5f5f5;
        }
    }
    // .header__body
    &__body {
        display: grid;
        width: 100%;
        grid-template-columns: 1fr 4.375rem 1fr;
        column-gap: 0.625rem;
        align-items: center;
        justify-content: space-between;
        @media (max-width: 61.9875rem) {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
        }
    }
    // .header__logo
    &__logo {
        z-index: 11;
        & img {
            @media (max-width: 61.9875rem) {
                height: 37px;
            }
        }
        @media (min-width: 992px) {
            cursor: pointer;
        }
    }
    // .header__burger
    &__burger {
        display: none;
        position: relative;
        z-index: 11;
        width: 1.125rem;
        height: 0.125rem;
        background-color: #ed165f;
        &::before,
        &::after {
            content: '';
            position: absolute;
            left: 0;
            width: 0.9375rem;
            height: 0.125rem;
            background-color: #ed165f;
            transition: 0.15s;
        }
        &::before {
            top: -0.375rem;
        }
        &::after {
            bottom: -0.375rem;
        }
        @media (max-width: 61.9875rem) {
            display: block;
        }
    }
    .burger-close {
        background-color: transparent;

        &::before {
            width: 18px;
            top: 0;
            transform: rotate(225deg);
        }
        &::after {
            width: 18px;
            bottom: 0;
            transform: rotate(-225deg);
        }
    }
}

.navigation {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    color: #000;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px; /* 128.571% */
    letter-spacing: 0.0125rem;
    column-gap: 2.5rem;

    @media (max-width: 68.75rem) {
        column-gap: 1.5rem;
    }
    @media (max-width: 61.9875em) {
        position: fixed;
        flex-wrap: nowrap;
        z-index: 10;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background-color: rgba(236, 135, 135, 0.95);
        flex-direction: column;
        align-items: center;
        row-gap: 1.875rem;
        font-size: 1.25rem;
        padding: 10.625rem 0 0.9375rem;
        overflow-y: auto;
        transition: 0.3s;
    }
    // .navigation__item
    &__item {
        padding: 0.8125rem 0.625rem;
        transition: 0.3s;
        border-bottom: 1px solid transparent;
        &:hover {
            color: #ed165f;
        }
        &.router-link-exact-active {
            color: #ed165f;
            border-bottom: 1px solid #ed165f;
            transform: translateY(-0.1875rem);
        }
        @media (max-width: 61.9875rem) {
            max-width: 150px;
        }
    }
}

.user-side {
    display: flex;
    column-gap: 40px;
    justify-content: flex-end;
    z-index: 11;
    // .user-side__search
    &__search {
        transition: 0.3s;
        @media (max-width: 691.8px) {
            position: absolute;
            flex-direction: column;
            background-color: transparent;
            row-gap: 25px;
            z-index: 50;
            top: 85px;
            right: 105%;
            font-size: 1.25rem;
        }
    }
    // .user-side__body
    &__body {
        display: flex;
        position: relative;
        column-gap: 30px;
        @media (max-width: 61.9875rem) {
            column-gap: 40px;
        }
    }
    // .user-side__item
    &__item {
        display: flex;
        flex-wrap: nowrap;

        &.router-link-exact-active {
            & .icon__account,
            & .icon__cart,
            & .icon__favorites {
                color: #ed165f;
            }
        }
    }
}

.icon {
    // .icon__account
    // .icon__cart
    // .icon__favorites
    &__account,
    &__cart,
    &__favorites {
        cursor: pointer;
        width: 1.125rem;
        height: 1.125rem;
        position: relative;
        transition: 0.5s;
        font-size: 1.125rem;
        transition: 0.3s;
        color: #000;
        @media (min-width: 992px) {
            &:hover {
                color: #ed165f;
            }
        }
    }
}

.active {
    left: 0;
}
.active-search {
    right: 5%;
}
</style>
