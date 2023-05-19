import { useParams } from "react-router-dom"
import { useProduct } from "../../context/ProductContext"
import { useEffect, useState } from "react"
import axios from "axios"
import {addToCart, addToWishList, removeFromCart, removeFromWishlist } from "../../Services/ProductService"

export const ProductPage = () => {
    const {productId} = useParams()
    const { productState : {initialProducts},productDispatch } = useProduct()
    // const [product , setProduct] = useState()
    // console.log(product);
    const product = initialProducts?.find((product)=> product._id=== productId)
    // console.log(product);
    // console.log(product);

    // useEffect(()=> {
    //    axios
    //    .get(`/api/products/${productId}`)
    //    .then(res => setProduct(res.data.product))
    //    .catch(err=> console.error(err))
    // },[])

    return(
        <div>
          <p> {product?.name}</p>
          <p> {product?.category}</p>
          <p> {product?.price}</p>
          {product?.inCart ? <button onClick={()=> removeFromCart(product, productDispatch)}>Remove To Cart</button> : <button onClick={()=>addToCart(product, productDispatch)}>Add To Cart</button>}
          {product?.inWishlist ? <button onClick={()=>removeFromWishlist(product,productDispatch)}>Remove To Wishlist</button> : <button onClick={()=> addToWishList(product, productDispatch)}>Add To Wishlist</button>}
        </div>
    )
}