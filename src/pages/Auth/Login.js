import './Auth.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { LoginUser, TestUserLogin } from '../../Services/Authservice';
import toast, { Toaster } from 'react-hot-toast';
import { useProduct } from '../../context/ProductContext';
import { useEffect } from 'react';


export const Login = () => {
  const token = localStorage.getItem('token')
  const { setLoader, productDispatch } = useProduct()
  const navigate = useNavigate()
  const location = useLocation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const TestUserLoginON = () => {
    TestUserLogin(toast, navigate, location,productDispatch)
  }

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

      <form className="form__login" onSubmit={handleSubmit((data) => LoginUser(data, toast, navigate, location, productDispatch))}>
        <h2 className="login">Login</h2>
        <label className="label__login">Email:</label>
        <input required className="input__login" type="email"  {...register("email", { required: true })} />
        <label className="label__login">Password:</label>
        <input required className="input__login" type="password"  {...register("password", { required: true })} />
        <div className='rmb'><label><input required type='checkbox' />Remember me </label>
          <Link>Forgot your password</Link></div>
        <button className="btn__login" type="submit">
          Login
        </button>
        <button className="btn__login" type="button" onClick={TestUserLoginON} >
          Test User Login
        </button>
        <Link to='/signup' >Create New Account</Link>
      </form>
    </div>
  )
}