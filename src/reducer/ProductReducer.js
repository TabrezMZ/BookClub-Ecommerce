export const productInitialState = {
    initialProducts: [],
    selectPrice: 500,
    categoryType: [],
    sorttype: '',
    selectRating: '',
    searchFilter: '',
    cart: [],
    wishlist: [],
    addressOfOrder: {},
    address: [],
    orderAddress : {},
    priceDetails: {
        discount: 0,
        totalAmount: 0,
        totalDiscount: 0,
    }
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
        case 'ADD_ADDRESS':
            return {
                ...state,
                address: [ ...state.address,...action.payload]
            }
        case 'DELETE_ADDRESS':
            return {
                ...state,
                address: state.address.filter((item)=> item.street !== action.payload)
            }
        case 'EDIT_ADDRESS':
            return {
                ...state,
                address: state.address.map((item)=> item.street === action.payload.street ? {...item, ...action.payload} : item)
            }
        case 'ORDER_ADDRESS':
            return {
                ...state,
                 orderAddress : action.payload
            }
        case 'SET_CHECKOUT_MODAL':
            return {
                ...state,
                priceDetails: { ...state.priceDetails, ...action.payload }
            }
        case 'LOGOUT_USER':
            return {
                ...state,
               cart : [],
               wishlist : [],
               address : [],
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