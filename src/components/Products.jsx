import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

import { MdDeleteOutline } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

// http://localhost:3444/product/all-product
function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showBrand, setShowBrand] = useState(false);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

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

  const handleSort = () => {
    setShowBrand(!showBrand);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearch = () => {
    //search by input field result
    let value = search.toLowerCase();
    let newProducts = [...products];
    let searchProduct = newProducts.filter((product) =>
      product.productName.toLowerCase().includes(value)
    );
    console.log(search, searchProduct);
    //filter by brand & category
    if (searchProduct && searchProduct.length) {
      setProducts(searchProduct);
    } else {
      getProducts();
    }
  };
  const handleSearch2 = () => {
    let newProducts = [...products];
    console.log(newProducts);
    let filteredProducts = newProducts.filter(
      (product) => product.brand === brand || product.category === category
    );
    console.log(brand, category, filteredProducts);
    if (filteredProducts && filteredProducts.length > 0) {
      setProducts(filteredProducts);
    } else {
      getProducts();
    }
  };
  return (
    <div className="min-h-auto pt-24 lg:min-h-screen lg:pt-24 lg:pb-10 flex justify-center items-center bg-green-100 flex-col">
      <div className="search-box fixed top-[70px] lg:top-[74px]">
        <input
          type="text"
          onChange={handleChange}
          value={search}
          className="text-[14px] bg-green-200 text-green-700 lg:w-[200px] w-[130px]  text-center px-3 py-[5px] rounded-md"
          placeholder="search by product name"
        />
        <button onClick={handleSearch} className="">
          🔍
        </button>
      </div>
      <div className="searchProduct fixed bg-green-200 px-5 pb-2 top-[70px] left-2">
        <button
          onClick={handleSort}
          className="text-pink-500 flex justify-center items-center gap-0"
        >
          sort{" "}
          {showBrand ? (
            <MdOutlineKeyboardArrowUp className="pt-[7px] text-[30px]" />
          ) : (
            <MdOutlineKeyboardArrowDown className="pt-[7px] text-[30px]" />
          )}
        </button>
        {showBrand && products && products.length ? (
          <>
            <div className="mt-4">
              <label htmlFor="brand">Brands :</label> <br />
              <select
                name="brand"
                id="brand"
                value={brand}
                onChange={handleBrandChange}
                className="min-w-[90px] mt-2 rounded-sm py-1"
              >
                <>
                  {products.map((product, index) => {
                    return (
                      <option key={index} value={product.brand}>
                        {product.brand}
                      </option>
                    );
                  })}
                </>
              </select>
            </div>
            <div className="mt-4">
              <label htmlFor="brand">Categories :</label> <br />
              <select
                name="category"
                id="category"
                value={category}
                onChange={handleCategoryChange}
                className="min-w-[90px] mt-2 rounded-sm py-1"
              >
                {products.map((product, index) => {
                  return (
                    <option key={index} value={product.category}>
                      {product.category}
                    </option>
                  );
                })}
              </select>
              <br />
              <button
                className="mt-2 bg-green-300 px-2 py-1 rounded-sm text-[12px]"
                onClick={handleSearch2}
              >
                search
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>

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
                  <h2 className=" font-bold text-[18px] text-green-700 mb-1 mt-3">
                    {productName}
                  </h2>
                  <h4 className="font-bold text-[14px] text-green-800 mb-1 mt-0">
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
