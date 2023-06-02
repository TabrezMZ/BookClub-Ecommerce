import { toast } from "react-hot-toast";
import { addQuantityInCart, removeQuantityInCart, removeFromCart } from "../../../Services/CartService";
import { addToWishList } from "../../../Services/WishlistService";
import { useProduct } from "../../../context/ProductContext";
import { useNavigate } from "react-router-dom";

export const CartCard = ({ product }) => {
  const navigate = useNavigate();
  const { productState, productDispatch } = useProduct();
  const { wishlist, cart } = productState;
  const inWishlist = wishlist.find((item) => item.id === product.id)

  const addToWishListProduct = () => {
    !inWishlist ?
      addToWishList(product, productDispatch, toast) : navigate('/wishlist')
  }
  return (
    <div key={product._id} className="card horizontal-container">
      <div className="card-horizontal">
        <img className="card-img horizontal-img" src={product.img} alt={product.name} />
        <div className="card-info">
          <div className="card-title">
            <div>
              <h4>{product.name}</h4>
              <p className="card-description">{product.author}</p>
            </div>
          </div>
          <div className="price">
            <p className="disc-price">₹{product.price}</p>
            <p className="actual-price">₹{product.originalPrice}</p>
            <p className="price-percentage">({100 - ((100 * product?.price) / product?.originalPrice).toFixed(2)}% OFF)</p>
          </div>
          <div className="qty">
            <button
              className="minus"
              onClick={() => product.qty > 1 && removeQuantityInCart(product, productDispatch)}
              disabled={product.qty > 1 ? false : true}
            >
              -
            </button>
            <span className="qty-count">{product.qty}</span>
            <button className="add" onClick={() => addQuantityInCart(product, productDispatch)}>
              +
            </button>
          </div>
        </div>
      </div>
      <div className="horizontal-btn">
        <button
          className="remove-btn"
          onClick={() => {
            removeFromCart(product, productDispatch, toast);
          }}
        >
          REMOVE
        </button>
        <button
          className="later-btn"
          onClick={() => addToWishListProduct()}
        >
          {inWishlist ? "ALREADY IN WISHLIST" : "MOVE TO WISHLIST"}
        </button>
      </div>
    </div>
  )
}