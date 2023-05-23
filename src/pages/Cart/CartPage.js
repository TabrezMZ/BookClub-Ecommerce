import { useProduct } from "../../context/ProductContext";
import { CartCard } from "./component/CartCard";
import { PriceCard } from "./component/PriceCard";
import "./CartPage.css"
export const CartPage = () => {
    const { productState, productDispatch } = useProduct();
    const { wishlist , cart } = productState;
    const isCartHasItem = cart.length > 0;
    
    
    return(
        <>
      <div className="cart-container">
        <div className="cart-main-container">
          <h3>MY CART {isCartHasItem && `(${cart.length})`}</h3>
          <div className="cart-manage">
            <div className="cart-manage-item">
              {isCartHasItem ? (
                cart.map((product) => <CartCard key={product._id} product={product} />)
              ) : (
                <h1> Your Cart Is Empty ! ☹️</h1>
              )}
            </div>
            {isCartHasItem && <PriceCard 
            // setCouponModal={setCouponModal}
             />}
          </div>
          {/* {couponModal && <CouponModal setCouponModal={setCouponModal} />} */}
        </div>
      </div>
    </>
    )
}