import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function DeleteProduct() {
  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3444/product/delete-product/${id}`)
      .then((res) => {
        if (res.data.success === true) {
          navigate("/products");
        }
      })
      .catch((err) => console.log(err));
  }, []);
}

export default DeleteProduct;
