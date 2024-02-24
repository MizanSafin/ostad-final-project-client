import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  let navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  axios.defaults.withCredentials = true;
  const handleClick = () => {
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    let user = { email, password };

    if (email && password) {
      axios
        .post(`http://localhost:3444/user/login`, user, {
          withCredentials: true,
        })
        .then((res) => {
          // console.log(res);
          console.log(" Otp code : ", res.data.OTPCode);

          if (res.data.success === true) {
            alert("Please check otp in console.");
            navigate(`/verify-login/${res.data.email}`);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div className="min-h-[650px] lg:min-h-screen lg:pt-24 lg:pb-10 flex justify-center items-center bg-gray-200">
        <div className=" bg-gray-300 p-7 rounded-md min-w-[380px] max-w-screen">
          <h2 className="text-center font-bold text-2xl text-green-600 mb-5">
            Login
          </h2>

          <div className=" mb-4">
            <label className="block mb-2 italic" htmlFor="email">
              Email :{" "}
            </label>
            <input
              id="email"
              className=" w-full   px-5 py-2  rounded-md"
              placeholder="Email.."
              type="email"
              ref={emailRef}
            />
          </div>
          <div className=" mb-4">
            <label className="block mb-2 italic" htmlFor="password">
              Password :{" "}
            </label>
            <input
              id="password"
              className=" w-full px-5 py-2   rounded-md"
              placeholder="Password.."
              ref={passwordRef}
            />
          </div>

          <button
            type="button"
            className="mt-3 btn bg-green-500 hover:bg-green-600 text-white px-7 text  rounded-full"
            onClick={handleClick}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
