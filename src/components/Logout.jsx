import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setIsLogin }) {
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3444/auth/logout`)
      .then((res) => {
        setIsLogin(false);
        if (res.data.logout) {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);
}

export default Logout;
