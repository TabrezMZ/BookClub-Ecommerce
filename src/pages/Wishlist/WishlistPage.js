import { useProduct } from "../../context/ProductContext";
import {addToWishList, removeFromWishlist } from "../../Services/WishlistService";
import { addToCart } from "../../Services/CartService";
import { useNavigate } from "react-router-dom";
import "./WishlistPage.css";
import { toast } from "react-hot-toast";

export const WishlistPage = () => {
    const navigate = useNavigate();
    const { productState, productDispatch } = useProduct();
  const { wishlist , cart } = productState;
  const isWishlistHasItem = wishlist.length > 0;

  
    
    return(
        <div className="wishlist-container">
        <div className="wishlist-main-container flex-center">
          <h3>MY WISHLIST {isWishlistHasItem && `(${wishlist.length})`}</h3>
          {isWishlistHasItem ? (
            <div className="wishlist-manage">
              <div className="wishlist">
                {wishlist.map((product) => {
                    const inWishlist = wishlist.find((item)=> item.id === product.id)
                    const inCart = cart.find((item)=> item.id === product.id)
                    const addToCartProduct = () => {
                        !inCart ? 
                       addToCart(product, productDispatch,toast) : navigate('/cart')
                   }
                   const removeFromWishlistProduct = () => {
                      !inWishlist ?
                       addToWishList(product, productDispatch,toast) : removeFromWishlist(product, productDispatch,toast)
                   }
                    return(
                   <div className="wishlist-item">
                   <img src={product.img} alt="" />
                   <div className="item-info">
                     <header>
                       <div className="item-desc">
                         <h4 className="card-title-header">{product.name}</h4>
                         <p className="card-description">{product.author}</p>
                         <div className="price">
                           <p className="disc-price">₹{product.price}</p>
                           <p className="actual-price">₹{product.originalPrice}</p>
                           <p className="price-percentage">
                             ({100 - ((100 * product?.price) / product?.originalPrice).toFixed(2)}% OFF)
                           </p>
                         </div>
                       </div>
                       <div className="delete-icon">
                         <i
                           className="fa fa-trash"
                           aria-hidden="true"
                           onClick={() => removeFromWishlistProduct()}
                         />
                       </div>
                     </header>
             
                     <button
                       className="btn default move-to-cart"
                       onClick={() =>addToCartProduct()}
                     >
                       {inCart ? "Already in Cart" : "Move to Cart"}
                     </button>
                   </div>
                 </div>
                )})}
              </div>
            </div>
          ) : (
            <h1 className="text-center"> Your Wishlist Is Empty ! ☹️</h1>
          )}
        </div>
      </div>
    )
}