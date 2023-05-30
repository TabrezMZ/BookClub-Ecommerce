import './Auth.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { SignUpUser } from '../../Services/Authservice';
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

export const SignUp = () => {
    const token = localStorage.getItem('token')
    const [show , setShow] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      
      if (token) {
        setTimeout(() => {
          navigate(location?.state?.from || "/products");
        }, 500);
      }
      
    return (
        <div className="contact-form__login">
            <form className="form__login" onSubmit={handleSubmit((data) =>SignUpUser(data,toast,navigate,location))}>
                <h2 className="login">SignUp</h2>
                <label className="label__login">FirstName:</label>
                <input required className="input__login" type="text" {...register("firstName", { required: true })}  />
                <label className="label__login">LastName:</label>
                <input required className="input__login" type="text" {...register("lastName", { required: true })}  />
                <label className="label__login">Email:</label>
                <input required className="input__login" type="email" {...register("email", { required: true })}  />
                <label className="label__login">Password:</label>
                <input required className="input__login" type={show ? 'text' : 'password'} {...register("password", { required: true })} />
                <i onClick={()=>setShow(!show)} >Eye</i>
                <label><input required type='checkbox' /> i accept terms & conditions</label>
                <button className="btn__login" type="submit">
                    Create New Account
                </button>
                <Link to='/login' >Already have an account</Link>
            </form>
        </div>
    )
}