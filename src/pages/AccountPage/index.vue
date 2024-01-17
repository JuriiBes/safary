<template>
    <div class="user">
        <div class="user__container">
            <div class="user__menu">
                <h2 class="user__title">ACCOUNT DASHBOARD</h2>
                <div class="user__menu-items">
                    <router-link :to="{ name: 'information' }" class="user__menu-item" @click="closeBurgerMenu">
                        <font-awesome-icon :icon="['fas', 'user']" class="user__menu-icon" />
                        <p>Account Information</p>
                        <div class="user__item-hover hover-menu">
                            <!-- <p class="hover-menu__top"></p>
                            <p class="hover-menu__button"></p> -->
                        </div>
                    </router-link>
                    <router-link :to="{ name: 'shipping' }" class="user__menu-item" @click="closeBurgerMenu">
                        <font-awesome-icon :icon="['fas', 'address-book']" class="user__menu-icon" />
                        <p>Address Book</p>
                        <div class="user__item-hover hover-menu">
                            <!-- <p class="hover-menu__top"></p>
                            <p class="hover-menu__button"></p> -->
                        </div>
                    </router-link>
                    <router-link :to="{ name: 'orders' }" class="user__menu-item" @click="closeBurgerMenu">
                        <font-awesome-icon :icon="['fas', 'gift']" class="user__menu-icon" />
                        <p>My Orders</p>
                        <div class="user__item-hover hover-menu">
                            <!-- <p class="hover-menu__top"></p>
                            <p class="hover-menu__button"></p> -->
                        </div>
                    </router-link>
                    <router-link :to="{ name: 'favorites' }" class="user__menu-item" @click="closeBurgerMenu">
                        <font-awesome-icon :icon="['fas', 'heart']" class="user__menu-icon" />
                        <p>My Favorites</p>
                        <div class="user__item-hover hover-menu">
                            <!-- <p class="hover-menu__top"></p>
                            <p class="hover-menu__button"></p> -->
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="user__body">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AccountPage',
}
</script>

<style lang="scss" scoped>
.user {
    padding: 9.375rem 0 4.375rem;
    @media (max-width: 1150px) {
        padding: 6.875rem 0 3rem;
    }
    @media (max-width: 991.98px) {
        padding: 5rem 0 2rem;
    }

    // .user__container
    &__container {
        display: grid;
        grid-template-columns: 20.625rem 1fr;
        gap: 2rem;
        @media (max-width: 1200px) {
            grid-template-columns: 250px 1fr;
            gap: 1rem;
        }
        @media (max-width: 750px) {
            grid-template-columns: 1fr;
        }
    }
    // .user__menu
    &__menu {
        box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
        padding: 2rem 0;
        display: flex;
        flex-direction: column;
        row-gap: 2rem;
        @media (max-width: 750px) {
            padding: 1rem 0 0.5rem;
            row-gap: 1rem;
        }
    }
    // .user__title
    &__title {
        font-weight: 800;
        line-height: 18px; /* 112.5% */
        letter-spacing: 0.2px;
        text-transform: uppercase;
    }
    // .user__menu-items
    &__menu-items {
        display: flex;
        flex-direction: column;
        @media (max-width: 750px) {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            column-gap: 1.5rem;
        }
        @media (max-width: 500px) {
            column-gap: 1rem;
        }
        @media (max-width: 390px) {
            grid-template-columns: 1fr;
        }
    }
    // .user__menu-item
    &__menu-item {
        position: relative;
        overflow: hidden;
        display: flex;
        flex-wrap: nowrap;
        column-gap: 1.125rem;
        padding: 1rem 2rem;
        line-height: 1.28;
        letter-spacing: 0.2px;
        align-items: center;
        & p {
            z-index: 1;
        }
        &.router-link-exact-active {
            color: #fff;
            font-weight: 800;
            transition: 0.2s;
            & .user__menu-icon {
                color: #fff;
                transition: 0.2s;
            }
            & .hover-menu {
                top: 0;
                transition: 0.2s;
            }
        }
        @media (max-width: 750px) {
            padding: 1rem;
        }
        @media (max-width: 500px) {
            padding: 0.8rem 1rem;
            & p {
                width: 100%;
                text-align: center;
            }
        }
    }
    // .user__item-hover
    &__item-hover {
        &::before,
        &::after {
            content: '';
        }
    }
    // .user__menu-icon
    &__menu-icon {
        z-index: 1;
        color: #111111;
    }
    // .user__body
    &__body {
        padding-top: 2rem;
        @media (max-width: 750px) {
            padding-top: 1rem;
        }
    }
}

.hover-menu {
    position: absolute;
    z-index: 0;
    top: 100%;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ed165f;
    // opacity: 0;

    // .hover-menu__top
    // .hover-menu__button
    // &__top,
    // &__button {
    //     display: block;

    //     position: absolute;
    //     right: 0;
    //     width: 32px;
    //     height: 32px;
    //     background-color: #ed165f;
    //     overflow: hidden;
    //     &::before {
    //         content: '';
    //         display: block;
    //         width: 64px;
    //         height: 64px;
    //         border-radius: 50%;
    //         background-color: #fff;
    //     }
    // }
    // &__top {
    //     top: -32px;
    //     &::before {
    //         transform: translate(-50%, -50%);
    //     }
    // }
    // &__button {
    //     bottom: -32px;
    //     &::before {
    //         transform: translate(-50%, 0);
    //     }
    // }
}
</style>
