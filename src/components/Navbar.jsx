import React from "react";
import logo from "../assets/PixelPerfectByMR-Logo.png";
import { Link } from "react-router-dom";

function Navbar({ isLogin, avatar }) {
  return (
    <>
      <div className="navbar bg-green-200 fixed top-0 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] px-3 py-4 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link className="font-bold text-slate-600" to={"/"}>
                  Home
                </Link>
              </li>
              <li>
                <Link className="font-bold text-slate-600" to={"/products"}>
                  Product
                </Link>
              </li>
              <li>
                {isLogin === true ? (
                  <>
                    <Link
                      className="font-bold text-slate-600"
                      to={"/add-product"}
                    >
                      Add Product
                    </Link>
                    <Link className="font-bold text-slate-600" to={"/logout"}>
                      Log Out{" "}
                    </Link>
                  </>
                ) : (
                  <Link className="font-bold text-slate-600" to={"/login"}>
                    Log in{" "}
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <Link to={"/"} className="btn btn-ghost text-xl">
            <img className="w-full h-full" src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link className="font-bold text-slate-600" to={"/"}>
                Home
              </Link>
            </li>
            <li>
              {isLogin ? (
                <>
                  <Link className="font-bold text-slate-600" to={"/products"}>
                    Product
                  </Link>
                </>
              ) : (
                <>
                  <Link className="font-bold text-slate-600" to={"/login"}>
                    Product
                  </Link>
                </>
              )}
            </li>
            {isLogin ? (
              <li>
                <Link className="font-bold text-slate-600" to={"/add-product"}>
                  Add Product
                </Link>
              </li>
            ) : (
              ""
            )}
            <li>
              {isLogin === true ? (
                <>
                  <Link className="font-bold text-slate-600" to={"/logout"}>
                    Log Out{" "}
                  </Link>
                </>
              ) : (
                <Link className="font-bold text-slate-600" to={"/login"}>
                  Log in{" "}
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {isLogin === true ? (
            <>
              <Link to={"/profile"}>
                <img
                  className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer"
                  src={avatar}
                  alt=""
                />
              </Link>
            </>
          ) : (
            <Link
              to={"/create-account"}
              className="btn bg-transparent text-slate-600 hover:bg-green-500 "
            >
              create account{" "}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
