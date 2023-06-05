import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { removeFromCart } from "../../Services/CartService";


export const CheckoutPrice = ({ setMsg }) => {
  const navigate = useNavigate()
  const [input , setInput] = useState('ONLINE PAYMENT')
  const { productState, productDispatch, couponValue, setCouponValue,order, setOrder } = useProduct();
  const userData = localStorage.getItem('userdata')
  const user = JSON.parse(userData)
  const { firstName, lastName, email } = user;
  const { cart, priceDetails: { discount, totalAmount, coupon, totalOriginalPrice }, orderAddress, address } = productState;
  const loadScript = async (url) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = url;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
  const displayRazorpay = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert('error')
      return;
    }

    const options = {
      key: "rzp_test_M7jr3sNuOwTIPE",
      amount: (totalAmount - coupon) * 100,
      currency: "INR",
      name: "BookClub",
      description: "Thank you for shopping with us",
      handler: function (response) {
        cart.forEach(product => {
          removeFromCart(product, productDispatch, toast)
        }); 
        setMsg(true)
        const orderData = {
          products: [...cart],
          amount: totalAmount - coupon,
          paymentId: response.razorpay_payment_id,
          delivery: orderAddress,
        };
        setOrder((prev)=> [...prev, orderData])
      },
      prefill: {
        name: `${firstName} ${lastName}`,
        email: email,
        contact: "9876543210",
      },
      theme: {
        color: "#4ade80",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const paymentfn = () => {
    if(input === 'ONLINE PAYMENT'){
      displayRazorpay()
    }
    else{
      cart.forEach(product => {
        removeFromCart(product, productDispatch, toast)
      }); 
      setMsg(true)
      const orderData = {
        products: [...cart],
        amount: totalAmount - coupon,
        paymentId: makeid(9),
        delivery: orderAddress,
      };
      setOrder((prev)=> [...prev, orderData])
    }
  }

  const placeOrderHandler = () => {
    if (address.length === 0) {
      toast.error("Please Add Address");
    } else {
      !orderAddress.name ? toast.error('plaese select address') : paymentfn();
    }
  };
  return (
    <div className="checkout-details">
      <div className="modal-main">
      <h4 className="text-center border-header">PAYMENT TYPE</h4>
        {['COD (cash on delivey)', 'ONLINE PAYMENT']?.map((item) => (
          <div className="coupon-option" key={item}>
            <label className="select-input">
              <input
                type="radio"
                name="radiop"
                className="radio-input"
                onChange={() =>
                  setInput(item)
                }
                checked={item === input}
              />
              <span className="text">
                {item}
              </span>
            </label>
          </div>
        ))}
      </div>
      <h4 className="text-center border-header">ORDER DETAILS</h4>
      <div>
        <li>
          <ul className="order-header">
            <p>Item</p>
            <p>Qty</p>
          </ul>
        </li>
        <li>
          {cart.map(({ _id, name, qty }) => (
            <ul key={_id}>
              <p>{name}</p>
              <p>{qty}</p>
            </ul>
          ))}
        </li>
      </div>
      <h4 className="text-center border-header">PRICE DETAILS</h4>

      <div className="checkout-calculate">
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

          <ul>
            <p>Coupon Discount</p>
            <p>
              {coupon !== 0 && "-"}₹ {coupon}
            </p>
          </ul>
          {coupon !== 0 && (
            <ul className="coupon-msg">
              <p>
                <img src="https://cdn-icons-png.flaticon.com/512/726/726448.png" />
                {couponValue.couponName}
              </p>
            </ul>
          )}
        </li>
      </div>
      <ul>
        <h4>Total Amount</h4>
        <h4>₹ {totalAmount - coupon}</h4>
      </ul>
      <p className="save-msg">You will save ₹ {discount + coupon} on this order</p>
      <h4 className="text-center border-header">DELIVER TO</h4>
      {orderAddress?.name && (
        <div className="deliver-container ">
          <div>
            <p className="paragraph-md ">{orderAddress.name}</p>
            <p className="paragraph-sm">
              {orderAddress.street}, {orderAddress.city} , {orderAddress.state} ,
              {orderAddress.country}. {orderAddress.zipCode}
            </p>
            <p className="paragraph-sm">Phone Number : {orderAddress.mobile}</p>
          </div>
        </div>
      )}
      <div className="primary-btn text-center" onClick={() => placeOrderHandler()}>
        <button className="link-btn checkout-btn">Place Order</button>
      </div>
    </div>
  )
}