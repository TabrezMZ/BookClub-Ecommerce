import "./NavBar.css";
import { Link, useLocation } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const { productState, productDispatch, setLoader, drawer, setDrawer } = useProduct();
  const { wishlist , cart } = productState;
  const navigate = useNavigate();
  const location = useLocation()
  const searchFilter = (e) => {
    productDispatch({ type: "SEARCH_FILTER", payload: e.target.value });
    if(location.pathname==='/'){
      navigate("/products");
    }
  };
  return (
    <div className="nav-header">
      <ul className="navbar">
        <div className="navbar-main">
          <div className="navbar-left">
          {window.location.href.includes("products") && (
              <i
                className="fa fa-bars drawer-hamberg-btn"
                aria-hidden="true"
                onClick={() => setDrawer(!drawer)}
              />
            )}
            <Link to="/"><h2>BookClub</h2></Link>
          </div>
          <Link to="/products"><h4>Shop Now</h4></Link>
          <div className="search-container">
            <i className="fa fa-search" aria-hidden="true"></i>
            <input
              type="search"
              name="search"
              autoComplete="false"
              onChange={(e) => searchFilter(e)}
              placeholder="search products"
              className="search-bar"
            />
          </div>
          <ul className="navbar-right">
            <li>
              <div
                className="icon cart-badge"
                onClick={() => navigate("/wishlist")}
              >
                <i className="fa fa-heart" title="Wishlist"></i>
                {wishlist.length >0 && <div className="notification-icon flex-center">
                  <span>{wishlist.length}</span>
                </div>}
              </div>
            </li>
            <li className="nav-cart" onClick={() => navigate("/cart")}>
              <div className="icon cart-badge">
                <i className="fa fa-shopping-cart" title="Cart"></i>
                  {cart.length > 0 && <div className="notification-icon flex-center">
                    <span>{cart.length}</span>
                  </div>}
              </div>
            </li>
            <li onClick={() => navigate("/profile")}>
              <img
                src="https://github.com/rutvikpumak/pustaka-ecom/blob/dev/images/logo.png?raw=true"
                alt="login"
                // title={token ? "User Profile" : "Sign In"}
              />
            </li>
          </ul>
        </div>
        <div className="search-container search-mob" >
          <i className="fa fa-search" aria-hidden="true"></i>
          <input
            type="search"
            name="search"
            className="search-bar"
            placeholder="Search for product"
            id=""
            onChange={(e) => searchFilter(e)}
          />
        </div>
      </ul>
    </div>
  );
};
