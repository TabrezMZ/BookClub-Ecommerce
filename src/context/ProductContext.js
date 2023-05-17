import { createContext, useContext, useEffect, useReducer } from "react";
import { getProducts } from "../Services/ProductService";



export const ProductContext = createContext()

const productInitialState = {
    initialProducts : []
}

const productsReducer = (state, action) => {
    switch (action.type){
        case 'GET_PRODUCTS' : 
        return {
            ...state,initialProducts : action.payload
        }
    }
}

export const ProductContextProvider = ({children}) => {
    const [productState , productDispatch] = useReducer(productsReducer,productInitialState)
    useEffect(()=> {
        getProducts(productDispatch)
    },[])
    return(
        <ProductContext.Provider value={{productState}}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProduct = ()=> useContext(ProductContext)