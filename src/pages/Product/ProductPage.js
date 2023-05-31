import { useParams } from "react-router-dom"
import { useProduct } from "../../context/ProductContext"
import { addToWishList, removeFromWishlist } from "../../Services/WishlistService"
import { addToCart } from "../../Services/CartService"
import './Product.css'
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"

export const ProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams()
  const { productState: { initialProducts, cart, wishlist }, productDispatch,setLoader } = useProduct()
  const token = localStorage.getItem('token')
  // const [product , setProduct] = useState()
  // console.log(product);
  const product = initialProducts?.find((product) => product.id === productId)

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
            <p className="price-percentage">{Math.round(100 - ((100 * product?.price) / product?.originalPrice))}% OFF</p>
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
            onClick={() => addToCartProduct()}
          // disabled={btnDisabled}
          >
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>{" "}
            {inCart ? "Go to Cart" : "Add to Cart"}
          </button>

          <button
            className="btn outlined-default  wishlist-btn"
            onClick={() => addToWishListProduct()}
          // disabled={btnWishlistDisabled}
          >
            <i className="fa fa-heart-o" aria-hidden="true"></i>{" "}
            {inWishlist ? "Go to Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  )
}