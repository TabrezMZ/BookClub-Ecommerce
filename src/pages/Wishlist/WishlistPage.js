import { useEffect } from "react"
import { getwishlist } from "../../Services/ProductService"

export const WishlistPage = () => {
    useEffect(()=> {
        getwishlist()
    },[])
    return(
        <div>
            <h1>Wishlist Page</h1>
        </div>
    )
}