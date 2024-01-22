import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage/index'
import ClothesPage from '../pages/ClothesPage/index'
import ShoesPage from '../pages/ShoesPage/index'
import AccessoriesPage from '../pages/AccessoriesPage/index'
import AboutUsPage from '../pages/AboutUsPage/index'
import ContactsPage from '../pages/ContactsPage/index'
import TermsConditionsPage from '../pages/TermsConditionsPage/index'
import AccountPage from '../pages/AccountPage/index'
import CartPage from '../pages/CartPage/index'
import CheckoutPage from '../pages/CartPage/CheckoutPage'
import SearchPage from '../pages/SearchPage/index'
import ProductPage from '../pages/ProductPage/index'

import UserInformation from '../pages/AccountPage/InformationAccount/UserInformation'
import AddressBook from '../pages/AccountPage/InformationAccount/AddressBook'
import MyOrders from '../pages/AccountPage/InformationAccount/MyOrders'
import MyFavorites from '../pages/AccountPage/InformationAccount/MyFavorites'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/clothes',
        name: 'clothes',
        component: ClothesPage,
    },
    {
        path: '/shoes',
        name: 'shoes',
        component: ShoesPage,
    },
    {
        path: '/accessories',
        name: 'accessories',
        component: AccessoriesPage,
    },
    {
        path: '/about',
        name: 'about',
        component: AboutUsPage,
    },
    {
        path: '/contacts',
        name: 'contacts',
        component: ContactsPage,
    },
    {
        path: '/conditions',
        name: 'conditions',
        component: TermsConditionsPage,
    },
    {
        path: '/account',
        name: 'account',
        component: AccountPage,
        children: [
            {
                path: '',
                name: 'information',
                component: UserInformation,
            },
            {
                path: 'shipping',
                name: 'shipping',
                component: AddressBook,
            },
            {
                path: 'orders',
                name: 'orders',
                component: MyOrders,
            },
            {
                path: 'favorites',
                name: 'favorites',
                component: MyFavorites,
            },
        ],
    },
    {
        path: '/favorit',
        name: 'favorit',
        component: AccountPage,
        children: [
            {
                path: '',
                name: 'favorites',
                component: MyFavorites,
            },
        ],
    },
    {
        path: '/cart',
        name: 'cart',
        component: CartPage,
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: CheckoutPage,
    },
    {
        path: '/search/:request?',
        name: 'search',
        component: SearchPage,
    },
    {
        path: '/product/:productId',
        name: 'product',
        component: ProductPage,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
