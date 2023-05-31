import './Auth.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { LoginUser, TestUserLogin } from '../../Services/Authservice';
import toast, { Toaster } from 'react-hot-toast';
import { useProduct } from '../../context/ProductContext';


export const Login = () => {
    const token = localStorage.getItem('token')
    const { setLoader} = useProduct()
    const navigate = useNavigate()
    const location = useLocation()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const TestUserLoginON = () => {
        TestUserLogin(toast,navigate,location)
      }

      if (token) {
        setLoader(true);
          setTimeout(() => {
            navigate(location?.state?.from || "/products");
            setLoader(false);
        }, 500);
      }
      
    return (
        <div className="contact-form__login">
           
            <form className="form__login" onSubmit={handleSubmit((data) =>LoginUser(data,toast,navigate,location))}>
                <h2 className="login">Login</h2>
                {/* <label className="label__login">FirstName:</label>
                <input className="input__login" type="text" {...register("FirstName", { required: true })} />
                <label className="label__login">LastName:</label>
                <input className="input__login" type="text" {...register("LastName", { required: true })} /> */}
                <label className="label__login">Email:</label>
                <input required className="input__login" type="email"  {...register("email", { required: true })} />
                {/* <span style={{color:'red',fontWeight:600 }}>{errors.FirstName && <p>FirstName is required.</p>}</span> */}
                <label className="label__login">Password:</label>
                <input required className="input__login" type="password"  {...register("password", { required: true })} />
                <div  className='rmb'><label><input required type='checkbox' />Remember me </label>
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