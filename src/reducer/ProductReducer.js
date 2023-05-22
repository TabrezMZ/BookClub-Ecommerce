export const productInitialState = {
    initialProducts: [],
    selectPrice: 500,
    categoryType: [],
    sorttype: '',
    selectRating: '',
    searchFilter: '',
    cart: [],
    wishlist: []
}

export const productsReducer = (state, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state, initialProducts: action.payload
            }
        case 'PRICE_FILTER':
            return {
                ...state, selectPrice: action.payload
            }
        case 'CATEGORY_FILTER_ADD':
            return {
                ...state, categoryType: [...state.categoryType, action.payload]
            }
        case 'CATEGORY_FILTER_REMOVE':
            return {
                ...state, categoryType: state.categoryType.filter((cat) => cat !== action.payload)
            }
        case 'SORT_FILTER':
            return {
                ...state, sorttype: action.payload
            }
        case 'RATING_FILTER':
            return {
                ...state, selectRating: action.payload
            }
        case 'SEARCH_FILTER':
            return {
                ...state, searchFilter: action.payload
            }
        case 'ADD_TO_WISHLIST_PRODUCT':
            return {
                ...state,
                wishlist: [...action.payload]
            }
        case 'REMOVE_FROM_WISHLIST_PRODUCT':
            return {
                ...state,
                wishlist: [...action.payload]
            }
        case 'ADD_TO_CART_PRODUCT':
            return {
                ...state,
                cart: [...action.payload]
            }
        case 'REMOVE_FROM_CART_PRODUCT':
            return {
                ...state,
                cart: [...action.payload]
            }
        case 'CLEAR_FILTER':
            return {
                ...state,
                selectPrice: 500,
                categoryType: [],
                sorttype: '',
                selectRating: '',
            }
        default:
            return state
    }
}