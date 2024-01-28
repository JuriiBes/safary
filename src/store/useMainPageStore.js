import { defineStore } from 'pinia'
// import { productList } from '@/data/products'
import { numberOfCardsAccordingToTheWidthOfTheScreen } from '@/store/helpers/helpers'

import DbOperations from './helpers/DbOperations'
const collectionDB = new DbOperations('productList')

export const useMainPageStore = defineStore('main_page', {
    state: () => ({
        dataProductList: [],
        productListToRender: null,
        loading: false,
        error: null,
    }),
    getters: {
        isLoading: (state) => state.loading,
        hasError: (state) => state.error,

        getProductListToRender: ({ productListToRender }) => productListToRender,

        getNumberButtonsToPagination: (state) => {
            return Math.ceil(state.dataProductList.length / numberOfCardsAccordingToTheWidthOfTheScreen())
        },
        getProductByNumberId: (state) => (idNumber) => {
            let indexFind = state.dataProductList.findIndex((product) => product.id == idNumber)
            return state.dataProductList[indexFind]
        },
    },
    actions: {
        loadList() {
            this.error = null
            this.loading = true

            collectionDB
                .loadItemsList()
                .then((list) => {
                    this.dataProductList = list
                })
                .catch((error) => {
                    this.error = error
                })
                .finally(() => {
                    this.loading = false
                    this.aSortedListProduct()
                    this.aListProductToRenderCard(0)
                })
        },
        addItem(item) {
            this.error = null
            this.loading = true
            collectionDB
                .addItem(item)
                .then(() => {
                    this.loadList()
                })
                .catch((error) => {
                    this.error = error
                })
                .finally(() => {
                    this.loading = false
                })
        },
        deleteItem(itemId) {
            this.error = null
            this.loading = true

            collectionDB
                .deleteItem(itemId)
                .then(() => {
                    this.loadList()
                })
                .catch((error) => {
                    this.error = error
                })
                .finally(() => {
                    this.loading = false
                })
        },
        updateItem(itemId, data) {
            this.error = null
            this.loading = true

            collectionDB
                .updateItem({ itemId, data })
                .then(() => {
                    this.loadList()
                })
                .catch((error) => {
                    this.error = error
                })
                .finally(() => {
                    this.loading = false
                })
        },
        loadFilteredData({ fieldTitle, compareOperator, valueToCompare }) {
            this.error = null
            this.loading = true
            collectionDB
                .loadFilteredData(fieldTitle, compareOperator, valueToCompare)
                .then((list) => {
                    this.dataProductList = list
                })
                .catch((error) => {
                    this.error = error
                })
                .finally(() => {
                    this.loading = false
                })
        },
        aListProductToRenderCard(indexButtonPagination) {
            let startIndexForCopy = indexButtonPagination * numberOfCardsAccordingToTheWidthOfTheScreen()
            let endIndexForCopy = (indexButtonPagination + 1) * numberOfCardsAccordingToTheWidthOfTheScreen()
            this.productListToRender = this.dataProductList.slice(startIndexForCopy, endIndexForCopy)
        },

        aSortedListProduct() {
            this.productListToRender = this.dataProductList.sort((a, b) => {
                if (a.createDate < b.createDate) return -1
                if (a.createDate > b.createDate) return 1
                return 0
            })
        },
    },
})
