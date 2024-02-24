import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

function VerifyLogin({ setAvatar, setIsLogin }) {
  let navigate = useNavigate();
  let { email } = useParams();
  const emailRef = useRef();
  const passwordRef = useRef();
  const otpRef = useRef();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get(`http://localhost:3444/user/getuser/${email}`)
      .then((res) => {
        // console.log(res.data);
        if (res.data.success === true) {
          emailRef.current.value = res.data.user.email;
          passwordRef.current.value = res.data.user.password;
          // setIsLogin(res.data.user.loggedIn);
          if (res.data.user.avatar) {
            setAvatar(res.data.user.avatar);
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = () => {
    let password = passwordRef.current.value;
    let otp = otpRef.current.value;
    let reqBody = { email, password, otp };

    axios
      .post(`http://localhost:3444/auth/verify-login`, reqBody, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success === true) {
          navigate("/products");
          setIsLogin(res.data.loggedIn);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="min-h-[650px] lg:min-h-screen lg:pt-24 lg:pb-10 flex justify-center items-center bg-gray-200">
        <div className=" bg-gray-300 p-7 rounded-md min-w-[380px] max-w-screen">
          <h2 className="text-center font-bold text-2xl text-green-600 mb-5">
            Verify Login
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
              type="password"
              className=" w-full px-5 py-2   rounded-md"
              placeholder="Password.."
              ref={passwordRef}
            />
          </div>
          <div className=" mb-4">
            <label className="block mb-2 italic" htmlFor="otp">
              OTP :{" "}
            </label>
            <input
              id="otp"
              className=" w-full px-5 py-2   rounded-md"
              placeholder="otp no.."
              ref={otpRef}
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

export default VerifyLogin;
