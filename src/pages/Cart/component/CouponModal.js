import { useState } from "react";
import { useProduct } from "../../../context/ProductContext";
import '../CartPage.css'
import { toast } from "react-hot-toast";

export const CouponModal = ({ setCouponModal }) => {
    const { couponValue, setCouponValue } = useProduct()
    const [input, setInput] = useState(couponValue);
    const COUPONS = [
        { couponName: "DIWALI_DHAMAKA", value: 50 },
        { couponName: "NEW_USER", value: 10 },
    ];
    return (
        <>
            <div className="modal-wrapper flex-center">
                <div className="modal">
                    <div className="modal-header">
                        <h3>Apply Coupon</h3>
                        <i className="fa fa-times" aria-hidden="true" onClick={() => setCouponModal(false)} />
                    </div>

                    <div className="modal-main">
                        {COUPONS?.map(({ couponName, value }) => (
                            <div className="coupon-option" key={couponName}>
                                <label className="select-input">
                                    <input
                                        type="radio"
                                        name="radio"
                                        className="radio-input"
                                        onChange={() =>
                                            setInput({
                                                couponName: couponName,
                                                value: value,
                                            })
                                        }
                                        checked={value === input.value ? true : false}
                                    />
                                    <span className="text">
                                        {value}% OFF:{couponName}
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>
                    <button
                        className="link-btn apply-btn"
                        onClick={() => {
                            toast.success('coupon applied successfully')
                            setCouponModal(false);
                            setCouponValue(input);
                        }}
                    >
                        APPLY
                    </button>
                </div>
            </div>
        </>
    )
}