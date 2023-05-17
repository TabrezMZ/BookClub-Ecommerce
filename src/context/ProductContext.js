import { createContext, useContext, useEffect, useReducer } from "react";
import { getProducts } from "../Services/ProductService";
import { productInitialState, productsReducer } from "../reducer/ProductReducer";

export const ProductContext = createContext()

export const ProductContextProvider = ({ children }) => {
    const [productState, productDispatch] = useReducer(productsReducer, productInitialState)
    useEffect(() => {
        getProducts(productDispatch)
    }, [])
    return (
        <ProductContext.Provider value={{ productState ,productDispatch}}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProduct = () => useContext(ProductContext)