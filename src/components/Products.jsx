import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

import { MdDeleteOutline } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";

// http://localhost:3444/product/all-product
function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const getProducts = () => {
    axios
      .get(`http://localhost:3444/product/all-product`)
      .then((res) => {
        // console.log(res.data);
        if (res.data.success === true) {
          setProducts(res.data.products);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getProducts();
  }, []);

  const deleteProductHandler = (id) => {
    let result = confirm("Do you want to delete ?");
    console.log(result, id);
    if (result === true) {
      navigate(`/delete-product/${id}`);
    } else {
      return;
    }
  };

  const updateProductHandler = (id) => {
    let result = confirm("Do you want to Update product ?");
    console.log(result, id);
    if (result === true) {
      navigate(`/update-product/${id}`);
    } else {
      return;
    }
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    let value = search.toLowerCase();
    if (value && value.length > 0) {
      let filteredProduct = products.filter((product) =>
        product.productName.toLowerCase().includes(value)
      );
      setProducts(filteredProduct);
    } else {
      getProducts();
    }
  }, [search]);
  return (
    <div className="min-h-auto pt-24 lg:min-h-screen lg:pt-24 lg:pb-10 flex justify-center items-center bg-green-100 flex-col">
      <input
        type="text"
        onChange={handleChange}
        value={search}
        className="text-[14px] bg-yellow-200 text-green-700 fixed top-[70px] lg:top-[74px] text-center px-3 py-[5px] rounded-md"
        placeholder="search by product name"
      />
      <div className="products bg-green-100 w-screen p-5 flex gap-3 lg:gap-5 justify-center flex-wrap">
        {products && products.length > 0 ? (
          <>
            {products.map((product, index) => {
              const { productName, brand, category, description, image, _id } =
                product;
              return (
                <div
                  key={index}
                  className="lg:w-[300px] w-[200px] bg-green-200 p-3 rounded"
                >
                  <img
                    className="mb-3 w-full lg:h-[250px] h-[180px] rounded-md object-cover"
                    src={image}
                    alt=""
                  />
                  <h2 className=" font-bold text-[18px] text-slate-500 mb-1 mt-3">
                    {productName}
                  </h2>
                  <h4 className="font-bold text-[14px] text-slate-500 mb-1 mt-0">
                    {description}
                  </h4>
                  <div className="btns flex gap-3 text-green-600  justify-end mt-2 lg:mt-4">
                    <button
                      onClick={() => updateProductHandler(`${_id}`)}
                      className="text-[20px] hover:text-[18px] hover:text-green-700"
                    >
                      <MdOutlineEdit />
                    </button>
                    <button
                      onClick={() => deleteProductHandler(`${_id}`)}
                      className="text-[20px] hover:text-[18px] hover:text-red-700"
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <h2>No product available</h2>
        )}
      </div>
    </div>
  );
}

export default Products;
