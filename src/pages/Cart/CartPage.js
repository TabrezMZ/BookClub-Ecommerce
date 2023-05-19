import { useEffect, useState } from "react"
import { getCart,addToCart,addToWishList, addQuantityInCart, removeQuantityInCart } from "../../Services/ProductService"
import axios from "axios"

export const CartPage = () => {
    const [cart,setCart] = useState([])
    console.log(cart);
     useEffect(()=> {
       axios
       .get(`/api/user/cart`, {
        headers : {
            "authorization" : `${localStorage.getItem("token")}`
        }
       })
       .then(res => setCart(res.data.cart))
       .catch(err=> console.error(err))
    },[])
    
    return(
        <div>
            <h1>Cart Page</h1>
            {cart?.map((product) => {
                return (
                    <div style={{ width: '500px', margin: '15px auto' }} key={product._id}>
                        <p>{product.rating}</p>
                        <p>{product.category}</p>
                        <p>{product.price}</p>
                        <button onClick={()=>addToCart(product)}>{product.inCart ? 'remove from cart' : 'add to cart'}</button>
                        <button onClick={()=>addToWishList(product)}>{product.inWishlist ? 'remove from wishlist' : 'add to wishlist'}</button>
                        <button onClick={()=> addQuantityInCart(product)}>+</button>{product?.qty}<button onClick={()=> removeQuantityInCart(product)}>-</button>
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}