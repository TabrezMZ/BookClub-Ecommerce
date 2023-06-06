import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './UserProfile.css'
import { toast } from "react-toastify";
import { useProduct } from "../../context/ProductContext";
import { AddressForm } from "./component/AddressForm";

export const UserProfile = () => {
  const navigate = useNavigate()
  const [check, setChecked] = useState(true);
  const [formDisplay, setFormDisplay] = useState(false);
  const { setLoader, productState, productDispatch, setAddressForm, setOrder } = useProduct()
  const { address, orderAddress } = productState;
  const userData = localStorage.getItem('userdata')
  const user = JSON.parse(userData)
  const { firstName, lastName, email } = user;



  const deleteAddress = (val) => {
    toast.error('Address Deleted')
    productDispatch({ type: "DELETE_ADDRESS", payload: val })
  }
  const editAddress = (val) => {
    const selectAdd = address.find((item) => item.id === val)
    setAddressForm(selectAdd);
    setFormDisplay(true)
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
    setFormDisplay(true)
  }

  const logOutHandler = () => {
    productDispatch({ type: 'LOGOUT_USER' })
    localStorage.removeItem("token");
    localStorage.removeItem("userdata");
    setOrder([])
    toast.success("Logout succesfully")
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 500);
    setTimeout(() => navigate("/"), 500)
  };



  return (
    <div className="profile-container">
      <div className="profile-main-container">
        <h2>Account</h2>

        <div className="profile-main">
          <div className="tabs">
            <input
              type="radio"
              className="tabs"
              id="profile"
              checked={check}
              onChange={() => setChecked(true)}
            />
            <label htmlFor="profile">Profile</label>
            <div className="tab">
              <div className="profile-details">
                <h3 className="details-header">Profile Details</h3>

                <div className="profile-details-main">
                  <div className="title">
                    <p className="paragraph-md">Full Name</p>
                    <p className="paragraph-md">Email</p>
                  </div>
                  <div>
                    <p className="paragraph-md">{`${firstName} ${lastName}`}</p>
                    <p className="paragraph-md"> {email}</p>
                  </div>
                </div>
              </div>
              <div className="">
                <h3 style={{ cursor: 'pointer', color: 'green' }} title="order history" className="details-header" onClick={() => navigate('order-summary')}>Order History</h3>
                <button className="btn danger setting-logout" onClick={() => logOutHandler()}>
                  Log Out
                </button>
              </div>
            </div>

            <input
              type="radio"
              className="tabs"
              id="address"
              checked={!check}
              onChange={() => setChecked(!check)}
            />
            <label htmlFor="address">Address</label>
            <div className="tab">
              <h3 className="details-header">My Addresses</h3>

              {address &&
                address.map(({ id, name, street, city, state, country, zipCode, mobile }) => (
                  <div key={id} className="address-container">
                    <p className="paragraph-md">{name}</p>
                    <div>
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

              <button
                onClick={() => addAddres()}
                className={`btn default address-add ${formDisplay && "displayNone"}`}
              >
                + Add New Address
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddressForm
        formDisplay={formDisplay}
        setFormDisplay={setFormDisplay}
      />
    </div>
  )
}