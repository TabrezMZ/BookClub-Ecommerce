import { Route, Routes } from "react-router-dom";
import "./App.css";
import logo from "./logo.png";
import Mockman from "mockman-js";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Home, Login, Product, SignUp, ProductPage, CartPage, WishlistPage, UserProfile, CheckoutOrder, AddressForm, NoPagefound, OrderSummary } from "./pages";
import { NavBar } from "./component/NavBar/NavBar";
import { RequireedAuth } from "./component/RequiredAuth/RequiredAuth";
import { Loader } from "./component/Loader/Loader";
import { useProduct } from "./context/ProductContext";

function App() {
  const { loader } = useProduct()
  return (
    <div className="App">

      {loader && <Loader />}
      <NavBar />
      <ToastContainer
          position="top-right"
          autoClose="500"
          limit="1"
          style={{ top: "4.5em", right: "0em" }}
        />
      <Routes>
        <Route path="/testapi" element={<Mockman />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<RequireedAuth><CartPage /></RequireedAuth>} />
        <Route path="/wishlist" element={<RequireedAuth> <WishlistPage /></RequireedAuth>} />
        <Route path="/profile" element={<RequireedAuth> <UserProfile /></RequireedAuth>} />
        <Route path="/ordercheckout" element={<RequireedAuth> <CheckoutOrder /></RequireedAuth>} />
        <Route path="/ordercheckout/addressform" element={<RequireedAuth> <AddressForm /></RequireedAuth>} />
        <Route path="/profile/order-summary" element={<RequireedAuth> <OrderSummary /></RequireedAuth>} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="*" element={<NoPagefound />} />
      </Routes>
    </div>
  );
}

export default App;
