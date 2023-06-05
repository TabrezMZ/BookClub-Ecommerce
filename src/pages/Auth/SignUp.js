import './Auth.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { SignUpUser } from '../../Services/Authservice';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useProduct } from '../../context/ProductContext';

export const SignUp = () => {
  const token = localStorage.getItem('token')
  const { setLoader } = useProduct()
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  useEffect(()=>{
    if (token) {
      setLoader(true);
      setTimeout(() => {
        navigate(location?.state?.from || "/products");
        setLoader(false);
      }, 500);
    }
  },[])

  return (
    <div className="contact-form__login">
      <form className="form__login" onSubmit={handleSubmit((data) => {
        if (data.password === data.confirmPassword) {
          SignUpUser(data, toast, navigate, location)
        } else {
          toast.error('please  check confirm password')
        }
      })}>
        <h2 className="login">SignUp</h2>
        <label className="label__login">FirstName:</label>
        <input required className="input__login" type="text" {...register("firstName", { required: true })} />
        <label className="label__login">LastName:</label>
        <input required className="input__login" type="text" {...register("lastName", { required: true })} />
        <label className="label__login">Email:</label>
        <input required className="input__login" type="email" {...register("email", { required: true })} />
        <label className="label__login">Password:
          <i className={`${show ? 'fa fa-eye-slash' : 'far fa-eye'}`} onClick={() => setShow(!show)} ></i></label>
        <input required className="input__login" type={show ? 'text' : 'password'} {...register("password", { required: true })} />
        <label className="label__login">Confirm Password:
          <i className={`${show ? 'fa fa-eye-slash' : 'far fa-eye'}`} onClick={() => setShow(!show)} ></i></label>
        <input required className="input__login" type={show ? 'text' : 'password'} {...register("confirmPassword", { required: true })} />
        <label><input required type='checkbox' /> i accept terms & conditions</label>
        <button className="btn__login" type="submit">
          Create New Account
        </button>
        <Link to='/login' >Already have an account</Link>
      </form>
    </div>
  )
}