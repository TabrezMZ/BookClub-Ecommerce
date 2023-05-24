import { useNavigate } from "react-router-dom";
import { useProduct } from "../../../context/ProductContext";

export const PriceCard = () => {
  const navigate = useNavigate()
    const { productState, productDispatch } = useProduct();
    const { wishlist , cart } = productState;
    const totalAmount = cart.reduce((acc,curr)=>acc + (curr.price * curr.qty),0 )
    const totalOriginalPrice =  cart.reduce((acc,curr)=> acc + (curr.originalPrice * curr.qty),0)
    const discount = totalOriginalPrice - totalAmount;

    const checkoutHandler = () => {
      productDispatch({type:"SET_CHECKOUT_MODAL",payload: {totalAmount , totalOriginalPrice , discount}})
      navigate('/ordercheckout')
    }
    return(
        <div className="price-details">
        {/* <ul className="coupon">
          <p>
            <i className="fa fa-tag" aria-hidden="true"></i> Have A Coupon ?
          </p>
          <div className="btn outlined-default coupon-btn" onClick={() => setCouponModal(true)}>
            Apply
          </div>
        </ul> */}
        <h4 className="text-center">PRICE DETAILS</h4>
  
        <div className="price-calculate">
          <li>
            <ul>
              <p>Price ({cart.length} items)</p>
              <p>₹ {totalOriginalPrice}</p>
            </ul>
            <ul>
              <p>Discount</p>
              <p>-₹ {discount}</p>
            </ul>
            <ul>
              <p>Delivery Charges</p>
              <p>FREE</p>
            </ul>
            {/* <ul>
              <p>Coupon Discount</p>
              <p>
                {coupon !== 0 && "-"}₹ {coupon.toFixed(2)}
              </p>
            </ul> */}
            {/* {coupon !== 0 && (
              <ul className="coupon-msg">
                <p>
                  <img src="https://cdn-icons-png.flaticon.com/512/726/726448.png" />
                  {couponValue.couponName}
                </p>
                <p
                  className="remove-coupon"
                  onClick={() => setCouponValue({ couponName: "", value: 0 })}
                >
                  ❌
                </p>
              </ul>
            )} */}
          </li>
        </div>
        <ul className="price-totalAmt">
          <h4>Total Amount</h4>
          <h4>₹ {totalAmount}</h4>
        </ul>
        <p className="save-msg">You will save ₹ {discount} on this order</p>
        <div className="primary-btn text-center" onClick={() => checkoutHandler()}>
          <button className="link-btn checkout-btn">Checkout</button>
        </div>
      </div>
    )
}