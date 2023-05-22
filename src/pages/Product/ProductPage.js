import { useParams } from "react-router-dom"
import { useProduct } from "../../context/ProductContext"
import { useEffect, useState } from "react"
import './Product.css'
import axios from "axios"
import {addToCart, addToWishList, removeFromCart, removeFromWishlist } from "../../Services/ProductService"

export const ProductPage = () => {
    const {productId} = useParams()
    const { productState : {initialProducts},productDispatch } = useProduct()
    // const [product , setProduct] = useState()
    // console.log(product);
    const product = initialProducts?.find((product)=> product.id=== productId)
    // console.log(product);
    // console.log(product);

    // useEffect(()=> {
    //    axios
    //    .get(`/api/products/${productId}`)
    //    .then(res => setProduct(res.data.product))
    //    .catch(err=> console.error(err))
    // },[])

    return(
        // <div>
        //   <p> {product?.name}</p>
        //   <p> {product?.category}</p>
        //   <p> {product?.price}</p>
        //   {product?.inCart ? <button onClick={()=> removeFromCart(product, productDispatch)}>Remove To Cart</button> : <button onClick={()=>addToCart(product, productDispatch)}>Add To Cart</button>}
        //   {product?.inWishlist ? <button onClick={()=>removeFromWishlist(product,productDispatch)}>Remove To Wishlist</button> : <button onClick={()=> addToWishList(product, productDispatch)}>Add To Wishlist</button>}
        // </div>

<div className="single-card-container flex-center">
<div className="single-card flex-center">
  <div className="single-card-left">
    <img className="single-card-img" src={product?.img} alt="" />
    {product?.isBestSeller && <span className="card-badge">Best Seller</span>}
  </div>

  <div className="single-card-right">
    <div className="single-card-title">
      <h3 className="single-card-title-header">{product?.name}</h3>
      <div className="star-ratings">
        {product?.rating}
        <i className="fa fa-star"></i>
      </div>
    </div>
    <div className="price">
      <p className="disc-price">₹{product?.price}</p>
      <p className="actual-price">₹{product?.originalPrice}</p>
      {/* <p className="price-percentage">{product.percentageOff}% OFF</p> */}
    </div>
    <p className="paragraph-sm msg">
      <i className="fa fa-bolt" aria-hidden="true"></i> Hurry , Only Few Left !
    </p>
    <span className="tag-msg">
      <i className="fa fa-tag" aria-hidden="true"></i> Fastest Delivery
    </span>
    <span className="tag-msg">
      <i className="fa fa-tag" aria-hidden="true"></i> Inclusive of All Taxes
    </span>
    <span className="tag-msg">
      <i className="fa fa-tag" aria-hidden="true"></i> Cash On Delivery Available
    </span>
    <div className="other-info">
      <li>
        <ul>
          Author : <p>{product?.author}</p>
        </ul>
        <ul>
          Category : <p>{product?.category}</p>
        </ul>
        <ul>
          Binding : <p>Hard Cover</p>
        </ul>
        <ul>
          Language : <p>English</p>
        </ul>
      </li>
    </div>

    <button
      className={`btn default`}
      // onClick={() => addToCartHandler()}
      // disabled={btnDisabled}
    >
      <i className="fa fa-shopping-cart" aria-hidden="true"></i>{" "}
      {product?.inCart ? "Go to Cart" : "Add to Cart"}
    </button>

    <button
      className="btn outlined-default  wishlist-btn"
      // onClick={() => addToWishlistHandler()}
      // disabled={btnWishlistDisabled}
    >
      <i className="fa fa-heart-o" aria-hidden="true"></i>{" "}
      {product?.inWishlist ? "Go to Wishlist" : "Add to Wishlist"}
    </button>
  </div>
</div>
</div>
    )
}