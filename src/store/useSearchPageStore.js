import { defineStore } from 'pinia'
import { productList } from '@/data/products'
import { numberOfCardsAccordingToTheWidthOfTheScreen } from '@/store/helpers/helpers'
import { searchForMatches } from '@/store/helpers/helpers'

export const useSearchPageStore = defineStore('search_page', {
    state: () => ({
        dataProductList: productList,
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
            this.productListToRender = this.dataProductList.sort((a, b) => {
                if (a.createDate < b.createDate) return -1
                if (a.createDate > b.createDate) return 1
                return 0
            })
        },
        aValueSearch(value) {
            this.valueSearch = value
            if (value !== null) {
                this.aResultSearchList()
            } else {
                this.resultSearch = this.dataProductList
                this.aListProductToRenderCard(0)
            }
        },
        aResultSearchList() {
            this.resultSearch = this.dataProductList.filter((product) => {
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
