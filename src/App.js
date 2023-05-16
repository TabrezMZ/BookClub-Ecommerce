import { Route, Routes } from "react-router-dom";
import "./App.css";
import logo from "./logo.png";
import Mockman from "mockman-js";
import { Home } from "./pages";
import { NavBar } from "./component/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/testapi" element={<Mockman />} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
