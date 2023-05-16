import './NavBar.css'
import { Link } from 'react-router-dom';

export const NavBar = () => {
    return (
        <div className='nav-header'>
            <ul className='navbar'>
                <div className='navbar-main'>
                    <div className='navbar-left'>
                        <Link className='logo-link' to='/'>BookClub</Link>
                    </div>
                    <div className='search-container'>
                        <i className="fa fa-search" aria-hidden="true"></i>
                        <input type='search' name='search' placeholder='search products' className='search-bar' />
                    </div>
                    <ul className='navbar-right'>
                        <li className='nav-login'>
                            <button className='login-btn'>Login</button>
                        </li>
                        <li className='nav-wishlist'>
                            <div className='icon wishlist-badge'>
                                <i className="fa fa-heart" title="Wishlist"></i>
                                <div className="notification-icon flex-center">
                                    <span>()</span>
                                </div>
                            </div>
                        </li>
                        <li className='nav-cart'>
                            <div className='icon cart-badge'>
                                <i className="fa fa-shopping-cart" title="Cart"></i>
                                <div className="notification-icon flex-center">
                                    <span>()</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </ul>
        </div>
    )
};
