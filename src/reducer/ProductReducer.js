export const productInitialState = {
    initialProducts : [],
    selectPrice : 500,
    categoryType : [],
    sorttype : '',
    selectRating : '',
}

export const productsReducer = (state, action) => {
    switch (action.type){
        case 'GET_PRODUCTS' : 
        return {
            ...state,initialProducts : action.payload
        }
        case 'PRICE_FILTER' : 
        return{
            ...state, selectPrice : action.payload
        }
        case 'CATEGORY_FILTER_ADD' : 
        return{
            ...state, categoryType :[ ...state.categoryType , action.payload]
        }
        case 'CATEGORY_FILTER_REMOVE' : 
        return{
            ...state, categoryType : state.categoryType.filter((cat)=> cat!==action.payload)
        }
        case 'SORT_FILTER' : 
        return{
            ...state, sorttype : action.payload
        }
        case 'RATING_FILTER' : 
        return{
            ...state, selectRating : action.payload
        }
        case 'CLEAR_FILTER' : 
        return {
            ...state ,  selectPrice : 500,
            categoryType : [],
            sorttype : '',
            selectRating : ''
        }
    }
}