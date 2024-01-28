import { defineStore } from 'pinia'
import { useMainPageStore } from '@/store/useMainPageStore'
import { numberOfCardsAccordingToTheWidthOfTheScreen } from '@/store/helpers/helpers'
import { searchForMatches } from '@/store/helpers/helpers'

export const useSearchPageStore = defineStore('search_page', {
    state: () => ({
        productListToRender: null,
        resultSearch: null,
        valueSearch: null,
    }),
    getters: {
        getProductListToRender: ({ productListToRender }) => productListToRender,

        getNumberButtonsToPagination: (state) => {
            return Math.ceil(state.resultSearch.length / numberOfCardsAccordingToTheWidthOfTheScreen())
        },
    },
    actions: {
        aListProductToRenderCard(indexButtonPagination) {
            let startIndexForCopy = indexButtonPagination * numberOfCardsAccordingToTheWidthOfTheScreen()
            let endIndexForCopy = (indexButtonPagination + 1) * numberOfCardsAccordingToTheWidthOfTheScreen()

            this.productListToRender = this.resultSearch.slice(startIndexForCopy, endIndexForCopy)
        },
        aSortedListProduct() {
            const dataProduct = useMainPageStore()
            this.productListToRender = dataProduct.dataProductList.sort((a, b) => {
                if (a.createDate < b.createDate) return -1
                if (a.createDate > b.createDate) return 1
                return 0
            })
        },
        aValueSearch(value) {
            this.valueSearch = value
            this.aResultSearchList()
        },
        aResultSearchList() {
            const dataProduct = useMainPageStore()
            this.resultSearch = dataProduct.dataProductList.filter((product) => {
                if (
                    searchForMatches(product.nameProduct, this.valueSearch) == true ||
                    searchForMatches(product.subcategoryProduct, this.valueSearch) == true
                )
                    return product
            })
            this.aListProductToRenderCard(0)
        },
    },
})
