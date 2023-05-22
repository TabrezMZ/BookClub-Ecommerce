import "./NavBar.css";
import { Link } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const { productState, productDispatch } = useProduct();
  const navigate = useNavigate();
  const searchFilter = (e) => {
    productDispatch({ type: "SEARCH_FILTER", payload: e.target.value });
    navigate("/products");
  };
  return (
    <div className="nav-header">
      <ul className="navbar">
        <div className="navbar-main">
          <div className="navbar-left">
            <Link to="/">BookClub</Link>
          </div>
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
                <div className="notification-icon flex-center">
                  {/* <span>{wishlist.length}</span> */}
                </div>
              </div>
            </li>
            <li className="nav-cart" onClick={() => navigate("/cart")}>
              <div className="icon cart-badge">
                <i className="fa fa-shopping-cart" title="Cart"></i>
                  <div className="notification-icon flex-center">
                    {/* <span>{cart.length}</span> */}
                  </div>
              </div>
            </li>
            <li onClick={() => navigate("/user_profile")}>
              <img
                src="https://github.com/rutvikpumak/pustaka-ecom/blob/dev/images/logo.png?raw=true"
                alt="login"
                // title={token ? "User Profile" : "Sign In"}
              />
            </li>
          </ul>
        </div>
      </ul>
    </div>
  );
};
