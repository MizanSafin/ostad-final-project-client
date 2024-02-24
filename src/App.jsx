import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Products from "./components/Products";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import VerifyLogin from "./components/VerifyLogin";
import { useEffect, useState } from "react";
import axios from "axios";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import CreateProduct from "./components/CreateProduct";
import DeleteProduct from "./components/DeleteProduct";
import UpdateProduct from "./components/UpdateProduct";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [avatar, setAvatar] = useState("");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3444/auth/verify", { withCredentials: true })
      .then((res) => {
        // console.log(res.data);
        if (res.data.login === true) {
          setIsLogin(res.data.user.loggedIn);
          setAvatar(res.data.user.avatar);
        } else {
          setIsLogin(false);
          setAvatar("");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar isLogin={isLogin} avatar={avatar} />
        <Routes>
          <Route path="/" element={<Home isLogin={isLogin} />} />
          <Route path="/products" element={<Products />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
          <Route path="/logout" element={<Logout setIsLogin={setIsLogin} />} />

          <Route
            path="verify-login/:email"
            element={
              <VerifyLogin
                setIsLogin={setIsLogin}
                isLogin={isLogin}
                setAvatar={setAvatar}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-product" element={<CreateProduct />} />
          <Route path="/delete-product/:id" element={<DeleteProduct />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
