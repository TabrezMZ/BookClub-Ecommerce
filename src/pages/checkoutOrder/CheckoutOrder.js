import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useProduct } from "../../context/ProductContext";
import { CheckoutPrice } from "./CheckoutPrice";
import './CheckoutOrder.css'
import { toast } from "react-toastify";

export const CheckoutOrder = () => {
  const navigate = useNavigate()
  const [msg, setMsg] = useState(false);
  const { productState, productDispatch, setAddressForm } = useProduct();
  const { address, orderAddress } = productState;


  const deleteAddress = (val) => {
    toast.error('Address deleted')
    productDispatch({ type: "DELETE_ADDRESS", payload: val })
  }
  const editAddress = (val) => {
    const selectAdd = address.find((item) => item.id === val)
    setAddressForm(selectAdd);
    navigate('addressform')
  }

  const addAddres = () => {
    setAddressForm({
      name: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      mobile: '',
    })
    navigate('addressform')
  }
  return (
    <>
      <div className="checkout-container">
        {msg ? (
          <h1 className="checkout-main-container flex-center  text-center">
            🥂 You order has successfully placed
          </h1>
        ) : (
          <div className="checkout-main-container flex-center">
            <h3>CHECKOUT </h3>
            <button
              onClick={() => addAddres()}
              className={`btn default `}
            >
              + Add New Address
            </button>
            <div className="checkout-manage">
              <div className="checkout-manage-item ">
                {address &&
                  address.map(({ id, name, street, city, state, country, zipCode, mobile }) => (
                    <div key={name} className="address-checkout-container ">
                      <label className="select-input">
                        <input
                          type="radio"
                          name="radio"
                          className="radio-input-address"
                          checked={id == orderAddress?.id}
                          onChange={() =>
                            productDispatch({
                              type: 'ORDER_ADDRESS',
                              payload: {
                                id,
                                name,
                                street,
                                city,
                                state,
                                country,
                                zipCode,
                                mobile,
                              },
                            })
                          }
                        />
                        <p className="paragraph-md ">{name}</p>
                      </label>
                      <div className="address-details-checkout">
                        <p className="paragraph-sm">
                          {street}, {city},{state}. {zipCode}
                        </p>
                        <p className="paragraph-sm">{country}.</p>
                        <p className="paragraph-sm">Phone Number : {mobile}</p>
                      </div>
                      <div className="address-btn">
                        <button
                          className="btn outlined-default address-edit"
                          onClick={() => editAddress(id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn outlined-danger address-remove"
                          onClick={() => deleteAddress(id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              <CheckoutPrice setMsg={setMsg} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}