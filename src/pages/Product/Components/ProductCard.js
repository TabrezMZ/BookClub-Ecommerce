import { toast } from 'react-hot-toast';
import { addToCart } from '../../../Services/CartService'
import { addToWishList, removeFromWishlist } from '../../../Services/WishlistService'
import { useProduct } from "../../../context/ProductContext";
import "../Product.css";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const { productState, productDispatch } = useProduct()
  const { wishlist, cart } = productState;
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

  const inWishlist = wishlist.find((item) => item.id === product.id)
  const inCart = cart.find((item) => item.id === product.id)

  const addToCartProduct = () => {
    token ?
      !inCart ?
        addToCart(product, productDispatch, toast) : navigate('/cart') : navigate('/login')
  }
  const addToWishListProduct = () => {
    token ?
      !inWishlist ?
        addToWishList(product, productDispatch, toast) : removeFromWishlist(product, productDispatch, toast) : navigate('/login')
  }

  return (
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
          <p className="price-percentage">({Math.round(100 - ((price / originalPrice) * 100))}% OFF)</p>
        </div>
      </div>
      <button
        className="btn default add-cart"
        onClick={() => addToCartProduct()}
      >
        <i className="fa fa-shopping-cart"></i>
        {inCart ? "Go to Cart" : "Add to Cart"}
      </button>
    </div>
  )
}