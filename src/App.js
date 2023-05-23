import { Route, Routes } from "react-router-dom";
import "./App.css";
import logo from "./logo.png";
import Mockman from "mockman-js";
import { Home, Login, Product, SignUp ,ProductPage, CartPage, WishlistPage} from "./pages";
import { NavBar } from "./component/NavBar/NavBar";
import { RequireedAuth } from "./component/RequiredAuth/RequiredAuth";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/testapi" element={<Mockman />} />
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Product/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/cart" element={   <RequireedAuth><CartPage/></RequireedAuth>} />
        <Route path="/wishlist" element={ <RequireedAuth> <WishlistPage/></RequireedAuth>} />
        <Route path="/product/:productId" element={<ProductPage/>} />
      </Routes>
    </div>
  );
}

export default App;
