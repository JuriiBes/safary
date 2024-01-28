import { defineStore } from 'pinia'
import { useMainPageStore } from '@/store/useMainPageStore'
import { numberOfCardsAccordingCategoriesPagesToTheWidthOfTheScreen } from '@/store/helpers/helpers'
import { filterProductsList } from '@/store/helpers/helpers'
import { sortedList } from '@/store/helpers/helpers'

export const useProductCategoryPageStore = defineStore('render_page', {
    state: () => ({
        dataProductList: null,
        dataFiltersProductList: null,
        productListToRender: null,
        sortSelectValue: null,
    }),
    getters: {
        getFilteredProductList: (state) => state.productListToRender,
        getNumberButtonsToPagination: (state) => {
            if (state.dataFiltersProductList === null)
                return Math.ceil(
                    state.dataProductList.length / numberOfCardsAccordingCategoriesPagesToTheWidthOfTheScreen()
                )
            else {
                return Math.ceil(
                    state.dataFiltersProductList.length / numberOfCardsAccordingCategoriesPagesToTheWidthOfTheScreen()
                )
            }
        },
    },

    actions: {
        aListProductToRenderCard(indexButtonPagination) {
            let startIndexForCopy = indexButtonPagination * numberOfCardsAccordingCategoriesPagesToTheWidthOfTheScreen()
            let endIndexForCopy =
                (indexButtonPagination + 1) * numberOfCardsAccordingCategoriesPagesToTheWidthOfTheScreen()
            if (this.dataFiltersProductList === null) {
                this.productListToRender = this.dataProductList.slice(startIndexForCopy, endIndexForCopy)
            } else {
                this.productListToRender = this.dataFiltersProductList.slice(startIndexForCopy, endIndexForCopy)
            }
        },
        aSortedListProduct() {
            if (this.dataFiltersProductList === null) {
                this.productListToRender = sortedList(this.dataProductList, this.sortSelectValue)
                this.aListProductToRenderCard(0)
            } else {
                this.productListToRender = sortedList(this.dataFiltersProductList, this.sortSelectValue)
                this.aListProductToRenderCard(0)
            }
        },
        aCreateDataProductList(categoryName) {
            const dataProduct = useMainPageStore()
            this.dataProductList = dataProduct.dataProductList.filter((product) => product.category == categoryName)
        },
        aFilteredProductList(filterData) {
            this.dataFiltersProductList = this.dataProductList.filter((product) => {
                if (filterProductsList(product, filterData) === true) return product
            })
            this.aSortedListProduct()
        },
        aSortSelectValue(value) {
            this.sortSelectValue = value
            this.aSortedListProduct()
        },
    },
})
