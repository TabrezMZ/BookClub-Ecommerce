import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./OrderSummary.css";
import { useProduct } from "../../../../context/ProductContext";
export function OrderSummary() {
    const {
        orders
    } = useProduct();

    return (
        <div className="summary-wrapper flex-center">
            {orders.length > 0 ? (
                <>
                    <h3>Order Summary</h3>
                    {
                        orders.map((order) => {
                            const  { amount, paymentId, delivery, products, orderId } = order;
                            return (
                                <div className="summary-container" key={paymentId}>
                                    <h3 className="summary-header ">Order Confirmed</h3>
                                    <div className="summary-main">
                                        <div className="summary-left">
                                            <h4>
                                                Order Id : <span>{orderId}</span>
                                            </h4>
                                           { paymentId &&  <h4>
                                                Payment Id : <span>{paymentId}</span>
                                            </h4>}
                                            <h4>
                                                Total Amount : <span>₹ {amount}</span>
                                            </h4>
                                            <div>
                                                <h4>Order will be delivered to :</h4>
                                                <p>{delivery.name}</p>

                                                <p className="paragraph-sm">
                                                    {delivery.street}, {delivery.city} ,
                                                </p>
                                                <p className="paragraph-sm">
                                                    {delivery.state} ,{delivery.country}. {delivery.zipCode}
                                                </p>
                                                <p className="paragraph-sm">Phone Number : {delivery.mobile}</p>
                                            </div>
                                        </div>
                                        <div className="summary-right">
                                            {products.map(({ img, name, author, price, qty }) => (
                                                <div className="card horizontal-container">
                                                    <div className="card-horizontal">
                                                        <img className="card-img horizontal-img" src={img} alt={name} />
                                                        <div className="card-info">
                                                            <div className="card-title">
                                                                <div>
                                                                    <h4>{name}</h4>
                                                                    <p className="card-description">{author}</p>
                                                                </div>
                                                            </div>
                                                            <div className="price">
                                                                <p>Total Quantity : {qty}</p>
                                                                <p>Price : ₹ {price}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </>
            ) : (
                <>
                    <h3 class="order-msg">Look's like your order is empty.</h3>
                    <Link to="/products">
                        <button className="link-btn">Shop Now</button>
                    </Link>
                </>
            )}
        </div>
    );
}
