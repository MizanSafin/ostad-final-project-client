import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3444/product/productByID/${id}`)
      .then((res) => {
        if (res.data.success === true) {
          let product = res.data.product;
          setName(product.productName);
          setBrand(product.brand);
          setCategory(product.category);
          setDescription(product.description);
          setImage(product.image);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = () => {
    const product = { productName: name, brand, category, description, image };
    axios
      .post(`http://localhost:3444/product/update-product/${id}`, product, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success === true) {
          navigate("/products");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="min-h-[800px] lg:min-h-screen lg:pt-24 lg:pb-10 flex justify-center items-center pt-10 bg-gray-200">
      <div className="product bg-gray-300 p-5 rounded-md w-screen max-w-[400px]">
        <h2 className="text-2xl text-center text-green-700 font-semibold mb-5">
          Update Product
        </h2>
        <div className="product-form m-5">
          <div className="product-group  mt-5">
            <label
              className="text-xl font-semibold text-gray-600 italic"
              htmlFor="product-name"
            >
              Product Name :
            </label>
            <input
              className="block w-full mt-2 px-3 py-2 rounded-md"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="product name .."
            />
          </div>
          <div className="product-group  mt-5">
            <label
              className="text-xl font-semibold text-gray-600 italic"
              htmlFor="product-brand"
            >
              Brand :
            </label>
            <input
              className="block w-full mt-2 px-3 py-2 rounded-md"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Brand  .."
            />
          </div>
          <div className="product-group  mt-5">
            <label
              className="text-xl font-semibold text-gray-600 italic"
              htmlFor="category"
            >
              Category :
            </label>
            <input
              className="block w-full mt-2 px-3 py-2 rounded-md"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="category .."
            />
          </div>
          <div className="product-group mt-5">
            <label
              className="text-xl font-semibold text-gray-600 italic"
              htmlFor="description"
            >
              Description :
            </label>
            <input
              className="block w-full mt-2 px-3 py-2 rounded-md"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="description .."
            />
          </div>

          <div className="product-group  mt-5">
            <label
              className="text-xl font-semibold text-gray-600 italic"
              htmlFor="image"
            >
              Product image :
            </label>
            <input
              className="block w-full mt-2 px-3 py-2 rounded-md"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="image url .."
            />
          </div>

          <button
            className="btn  mt-5 px-8 bg-green-400 text-slate-200 hover:bg-green-600 py-1"
            type="submit"
            onClick={handleClick}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
