import './Auth.css'
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { SignUpUser } from '../../Services/Authservice';

export const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    return (
        <div className="contact-form__login">
            <form className="form__login" onSubmit={handleSubmit((data) =>SignUpUser(data))}>
                <h2 className="login">SignUp</h2>
                <label className="label__login">Email:</label>
                <input required className="input__login" type="email" {...register("email", { required: true })}  />
                <label className="label__login">Password:</label>
                <input required className="input__login" type="password"  {...register("password", { required: true })} />
                <label><input required type='checkbox' /> i accept terms & conditions</label>
                <button className="btn__login" type="submit">
                    Create New Account
                </button>
                <Link to='/login' >Already have an account</Link>
            </form>
        </div>
    )
}