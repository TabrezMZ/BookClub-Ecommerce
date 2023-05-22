import { Link } from "react-router-dom"
import { addToCart, addToWishList } from "../../../Services/ProductService";
import { useProduct } from "../../../context/ProductContext";
import "../Product.css";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({product}) => {
    const navigate = useNavigate();
    const { productState, productDispatch } = useProduct()
    const { initialProducts, selectRating, selectPrice, categoryType, sorttype,searchFilter } = productState
    const {
        _id: id,
        img,
        name,
        author,
        price,
        originalPrice,
        isBestSeller,
        rating,
        percentageOff,
      } = product;

      const addToCartProduct = (item) => {
        addToCart(item, productDispatch)
    }
    const addToWishListProduct = (item) => {
        addToWishList(item, productDispatch)
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
        // className={`wishlist-icon ${isInWishlist ? `wishlist-toggle` : ``}`}
        className='wishlist-icon'
        onClick={() => addToWishListProduct()}
        disabled={true}
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
          <p className="price-percentage">({percentageOff}% OFF)</p>
        </div>
      </div>
      <button
        className="btn default add-cart"
        onClick={() => addToCartProduct()}
        // disabled={btnDisabled}
      >
        <i className="fa fa-shopping-cart"></i>
         {/* {isInCart ? "Go to Cart" : "Add to Cart"} */}
      </button>
    </div>
    )
}