import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './UserProfile.css'
import { toast } from "react-hot-toast";
import { useProduct } from "../../context/ProductContext";

export const UserProfile = () => {
    const navigate = useNavigate()
    const { setLoader, productDispatch } = useProduct()
    const userData = localStorage.getItem('userdata')
    const user = JSON.parse(userData)
    const { firstName, lastName, email } = user;


    const logOutHandler = () => {
        productDispatch({ type: 'LOGOUT_USER' })
        localStorage.removeItem("token");
        localStorage.removeItem("userdata");
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
                            <h3 className="details-header">Account Settings</h3>
                            <button className="btn danger setting-logout" onClick={() => logOutHandler()}>
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}