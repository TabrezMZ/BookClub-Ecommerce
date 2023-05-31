import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { getProducts } from "../Services/ProductService";
import { productInitialState, productsReducer } from "../reducer/ProductReducer";

export const ProductContext = createContext()

const formvalue = {
    id : 1,
    name: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    mobile: '',
}

export const ProductContextProvider = ({ children }) => {
    const [productState, productDispatch] = useReducer(productsReducer, productInitialState)
    const [addressForm, setAddressForm] = useState(formvalue)
    const [loader,setLoader] = useState(false)
    const [drawer , setDrawer] = useState(false)
    useEffect(() => {
        getProducts(productDispatch)
    }, [])
    return (
        <ProductContext.Provider value={{ productState ,productDispatch,addressForm, setAddressForm,loader,setLoader,drawer , setDrawer}}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProduct = () => useContext(ProductContext)