import { useEffect } from "react"
import { getCart } from "../../Services/ProductService"

export const CartPage = () => {
    useEffect(()=> {
         getCart()
    },[])
    return(
        <div>
            <h1>Cart Page</h1>
        </div>
    )
}