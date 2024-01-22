export function numberOfCardsAccordingToTheWidthOfTheScreen() {
    let screenSize = innerWidth
    if (screenSize < 570) return 8
    if (screenSize < 992) return 12
    return 16
}
export function numberOfCardsAccordingCategoriesPagesToTheWidthOfTheScreen() {
    let screenSize = innerWidth
    if (screenSize < 570) return 8
    return 12
}

export function sortedList(productList, value) {
    let productListToRender

    if (value !== 'low') {
        productListToRender = productList.sort((a, b) => {
            if (a[value] > b[value]) return -1
            if (a[value] < b[value]) return 1
            return 0
        })
    } else {
        productListToRender = productList.sort((a, b) => {
            if (a.price < b.price) return -1
            if (a.price > b.price) return 1
            return 0
        })
    }
    return productListToRender
}

function readerValueSize(value) {
    let arrayElementsValue = value.match(/\d|\w/gi)
    return arrayElementsValue.join('')
}

function searchingForMatchesInDataArrays(arrayBasicData, arraySearchMatches) {
    let result = 0
    for (const element of arrayBasicData) {
        let searchElement = readerValueSize(element)
        if (arraySearchMatches.includes(searchElement)) result += 1
    }
    return result
}

export function filterProductsList(dataProducts, dataFilters) {
    if (
        dataFilters.category !== null &&
        dataFilters.category !== 'All' &&
        dataFilters.category !== dataProducts.subcategoryProduct
    )
        return false

    if (dataFilters.size.length > 0 && searchingForMatchesInDataArrays(dataProducts.size, dataFilters.size) === 0)
        return false

    if (dataFilters.color.length > 0 && dataFilters.color.includes(dataProducts.color) !== true) return false

    if (dataFilters.price !== null) {
        if (dataProducts.price < dataFilters.price.minValue || dataProducts.price > dataFilters.price.maxValue)
            return false
    }

    return true
}

export function scrollToBlock(element) {
    document.getElementById(element).scrollIntoView({
        block: 'start',
        behavior: 'smooth',
    })
}

export function searchForMatches(elementBySearch, searchElement) {
    return elementBySearch.toLowerCase().includes(searchElement.toLowerCase())
}
