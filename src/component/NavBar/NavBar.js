import './NavBar.css'
import { Link } from 'react-router-dom';
import { useProduct } from "../../context/ProductContext"
import {useNavigate} from "react-router-dom"

export const NavBar = () => {
    const { productState,productDispatch } = useProduct()
    const navigate = useNavigate();
    const searchFilter = (e) => {
        productDispatch({type : 'SEARCH_FILTER', payload : e.target.value})
        navigate("/products")
    }
    return (
        <div className='nav-header'>
            <ul className='navbar'>
                <div className='navbar-main'>
                    <div className='navbar-left'>
                        <Link className='logo-link' to='/'>BookClub</Link>
                    </div>
                    <div className='search-container'>
                        <i className="fa fa-search" aria-hidden="true"></i>
                        <input type='search' name='search' autoComplete='false' onChange={(e)=>searchFilter(e)} placeholder='search products' className='search-bar' />
                    </div>
                    <ul className='navbar-right'>
                        <li className='nav-login'>
                            <button className='login-btn'><Link to='/login'>Login</Link></button>
                        </li>
                        <Link to='/wishlist'>
                        <li className='nav-wishlist'>
                            <div className='icon wishlist-badge'>
                                <i className="fa fa-heart" title="Wishlist"></i>
                                <div className="notification-icon flex-center">
                                    <span>()</span>
                                </div>
                            </div>
                        </li>
                        </Link>
                        <Link to='/cart'>
                        <li className='nav-cart'>
                            <div className='icon cart-badge'>
                                <i className="fa fa-shopping-cart" title="Cart"></i>
                                <div className="notification-icon flex-center">
                                    <span>()</span>
                                </div>
                            </div>
                        </li>
                        </Link>
                    </ul>
                </div>
            </ul>
        </div>
    )
};
