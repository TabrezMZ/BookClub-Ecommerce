import { createContext, useContext } from "react";



export const ProductContext = createContext()

export const ProductContextProvider = ({children}) => {
    return(
        <ProductContext.Provider value={{item : 4}}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProduct = ()=> useContext(ProductContext)