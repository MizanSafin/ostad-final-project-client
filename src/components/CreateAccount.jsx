import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  let nameRef = useRef();
  let emailRef = useRef();
  let passwordRef = useRef();
  let mobileRef = useRef();
  let navigate = useNavigate();
  let checkMobile = (mobile) => {
    let regex = /^(01|008801|8801|\+8801)[0-9]{9}$/;
    if (regex.test(mobile)) {
      return true;
    }
    return false;
  };
  let checkPasword = (password) => {
    let regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (regex.test(password)) {
      return true;
    }
    return false;
  };
  function handleClick() {
    let name = nameRef.current.value;
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    let mobile = mobileRef.current.value;
    let user = { name, email, password, mobile };
    if (name && email && checkPasword(password) && checkMobile(mobile)) {
      axios
        .post(`http://localhost:3444/user/create-user`, user, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success === true) {
            navigate("/login");
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("Fill all input field correctly");
    }
  }
  return (
    <div className="min-h-[700px] lg:min-h-screen lg:pt-24 lg:pb-10 flex justify-center items-center bg-gray-200">
      <div className=" bg-gray-300 p-7 rounded-md min-w-[380px] max-w-screen">
        <h2 className="text-center font-bold text-2xl text-green-600 mb-5">
          Create Account
        </h2>
        <div className=" mb-4">
          <label className="block mb-2 italic" htmlFor="name">
            Name :{" "}
          </label>
          <input
            className=" w-full  px-5 py-2  rounded-md "
            id="name"
            placeholder="Name.."
            ref={nameRef}
          />
        </div>
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
        <div className=" mb-4">
          <label className="block mb-2 italic" htmlFor="mobile">
            Mobile :{" "}
          </label>
          <input
            id="mobile"
            className=" w-full   px-5 py-2  rounded-md"
            placeholder="Mobile no.."
            ref={mobileRef}
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
  );
}

export default CreateAccount;
