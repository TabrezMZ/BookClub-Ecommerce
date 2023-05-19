import { useEffect, useState } from "react"
import { getwishlist } from "../../Services/ProductService"

export const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([])
    useEffect(()=> {
        setWishlist(getwishlist())  
    },[])
    return(
        <div>
            <h1>Wishlist Page</h1>
            {wishlist?.map((product) => {
                return (
                    <div style={{ width: '500px', margin: '15px auto' }} key={product._id}>
                        <p>{product.rating}</p>
                        <p>{product.category}</p>
                        <p>{product.price}</p>
                        {/* <button onClick={()=>addToCartProduct(product)}>{product.inCart ? 'remove from cart' : 'add to cart'}</button>
                        <button onClick={()=>addToWishListProduct(product)}>{product.inWishlist ? 'remove from wishlist' : 'add to wishlist'}</button> */}
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}