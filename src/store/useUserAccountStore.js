import { defineStore } from 'pinia'
import { usersData } from '@/data/users'

export const useUserAccountStore = defineStore('account_page', {
    state: () => ({
        userData: null,
        countCartItem: null,
        countFavoritesItem: null,
    }),
    getters: {
        getUserData: ({ userData }) => userData,
        getUserDataDetail: (state) => (section) => state.userData[section],
        getIncludesProductInFavoritesList: (state) => (productId) => {
            return state.userData.favorites.includes(productId)
        },
        getCountCartItems: (state) => (options) => {
            if (options == 'cart') {
                if (!state.countCartItem) {
                    state.countCartItem = state.userData.cart.cartItems.length
                    return state.countCartItem
                } else return state.countCartItem
            }
            if (options == 'favorites') {
                if (!state.countFavoritesItem) {
                    state.countFavoritesItem = state.userData.favorites.length
                    return state.countFavoritesItem
                } else return state.countFavoritesItem
            }
        },
        getIncludesProductInCart: (state) => (productId) => {
            return state.userData.cart.cartItems.findIndex((element) => element.idProduct == productId)
        },
    },
    actions: {
        receivingUserData(iter) {
            this.userData = usersData[iter]
        },
        deleteShippingAddress(index) {
            this.userData.postAddress.splice(index, 1)
        },
        deleteFavoritesItem(index) {
            this.userData.favorites.splice(index, 1)
            this.countFavoritesItem = this.userData.favorites.length
        },
        addToFavoritesList(productId) {
            let audit = this.userData.favorites.findIndex((product) => product == productId)
            if (audit < 0) this.userData.favorites.push(productId)
            else this.userData.favorites.splice(audit, 1)
            this.countFavoritesItem = this.userData.favorites.length
        },
        changeQuantityCartItem(indexItem, newValue) {
            this.userData.cart.cartItems[indexItem].quantity = newValue
        },
        addToCartList(productId) {
            let audit = this.userData.cart.cartItems.findIndex((product) => product.idProduct == productId)
            if (audit < 0) {
                this.userData.cart.cartItems.push({
                    idProduct: productId,
                    quantity: 1,
                })
                this.countCartItem = this.userData.cart.cartItems.length
            }
        },
        deleteCartItem(indexItem) {
            this.userData.cart.cartItems.splice(indexItem, 1)
            this.countCartItem = this.userData.cart.cartItems.length
        },
        addDeliveryMethodToCart(method) {
            this.userData.cart.delivery.deliveryMethod = method.deliveryMethod
            this.userData.cart.delivery.deliveryPrice = method.deliveryPrice
            this.userData.cart.delivery.deliveryStatus = method.deliveryStatus
        },
        addDeliveryAddressToCart(addressObj) {
            this.userData.cart.delivery.deliveryAddress = { ...addressObj }
        },
        addPaymentMethodToCart(method) {
            this.userData.cart.payment = method
        },
        addSizeToDataByProductCart(value) {
            this.userData.cart.cartItems[value.name].size = value.size
        },
        addToCartPositionsWithOrderOrFavorites(dataProducts) {
            for (const newCartItem of dataProducts) {
                if (this.userData.cart.cartItems) this.userData.cart.cartItems.push(newCartItem)
            }
            this.countCartItem = this.userData.cart.cartItems.length
        },
        addOrderToOrders(order) {
            this.userData.orders.push(order)
            this.userData.cart.cartItems = []
            this.countCartItem = this.userData.cart.cartItems.length
        },
    },
})
