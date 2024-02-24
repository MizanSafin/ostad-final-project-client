import React from "react";
import { Link } from "react-router-dom";

function Home({ isLogin }) {
  return (
    <div
      className="hero min-h-screen "
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
      }}
    >
      <div className="hero-overlay  bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl text-green-500 font-bold">
            Hello there 🖐
          </h1>
          <p className="mb-5 text-zinc-100 font-bold ">
            Find the best software here .Our company will supply you the best
            quality Software product for you .
          </p>
          <div className="btns flex gap-3 items-center justify-center">
            {isLogin != true ? (
              <>
                <Link
                  to={"/login"}
                  className="btn bg-green-600 hover:bg-green-400 text-slate-100 outline-none border-none "
                >
                  Login
                </Link>
                <Link
                  to={"/create-account"}
                  className="btn bg-green-600 hover:bg-green-400 text-slate-100 outline-none border-none "
                >
                  create account
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
