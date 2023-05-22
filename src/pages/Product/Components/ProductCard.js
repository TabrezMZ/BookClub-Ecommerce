import {addToCart} from '../../../Services/CartService'
import {addToWishList, removeFromWishlist} from '../../../Services/WishlistService'
import { useProduct } from "../../../context/ProductContext";
import "../Product.css";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({product}) => {
    const navigate = useNavigate();
    const { productState, productDispatch } = useProduct()
    const { wishlist , cart } = productState;
    // console.log(cart);
    // console.log(wishlist);
    const {
        _id: id,
        img,
        name,
        author,
        price,
        originalPrice,
        isBestSeller,
        rating,
      } = product;

      const inWishlist = wishlist.find((item)=> item.id === product.id)
      const inCart = cart.find((item)=> item.id === product.id)

      const addToCartProduct = () => {
         !inCart ? 
        addToCart(product, productDispatch) : navigate('/cart')
    }
    const addToWishListProduct = () => {
       !inWishlist ?
        addToWishList(product, productDispatch) : removeFromWishlist(product, productDispatch)
    }

    return(
        <div key={id} className={`card`}>
      <img
        className="card-img"
        src={img}
        alt={name}
        onClick={() => navigate(`/product/${product.id}`)}
      />
      {isBestSeller && <span className="card-badge">Best Seller</span>}
      <span
        role="button"
        className={`wishlist-icon ${inWishlist ? `wishlist-toggle` : ``}`}
        onClick={() => addToWishListProduct()}
        // disabled={true}
      >
        <i className="fa fa-heart" aria-hidden="true"></i>
      </span>
      <div className="card-info">
        <div className="">
          <div className="card-title">
            <h3 className="card-title-header" title={name}>
              {name}
            </h3>
            <div className="card-star">
              <p>{rating}</p>
              <i className="fa fa-star"></i>
            </div>
          </div>
          <p className="card-description">{author}</p>
        </div>
        <div className="price">
          <p className="disc-price">₹{price}</p>
          <p className="actual-price">₹{originalPrice}</p>
          <p className="price-percentage">({Math.round(100 - ((price / originalPrice)  * 100))}% OFF)</p>
        </div>
      </div>
      <button
        className="btn default add-cart"
        onClick={() => addToCartProduct()}
        // disabled={btnDisabled}
      >
        <i className="fa fa-shopping-cart"></i>
         {inCart ? "Go to Cart" : "Add to Cart"}
      </button>
    </div>
    )
}