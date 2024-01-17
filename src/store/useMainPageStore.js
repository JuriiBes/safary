import { defineStore } from 'pinia'
import { productList } from '@/data/products'
import { numberOfCardsAccordingToTheWidthOfTheScreen } from '@/store/helpers/helpers'

export const useMainPageStore = defineStore('main_page', {
    state: () => ({
        dataProductList: productList,
        productListToRender: null,
    }),
    getters: {
        getProductListToRender: ({ productListToRender }) => productListToRender,
        getNumberButtonsToPagination: ({ dataProductList }) =>
            Math.ceil(dataProductList.length / numberOfCardsAccordingToTheWidthOfTheScreen()),
        getProductByNumberId: (state) => (idNumber) => {
            let indexFind = state.dataProductList.findIndex((product) => product.id == idNumber)
            return state.dataProductList[indexFind]
        },
    },
    actions: {
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
