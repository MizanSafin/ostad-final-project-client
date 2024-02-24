import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [mobile, setMobile] = useState("");
  let [avatar, setAvatar] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3444/auth/verify", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data.login === true) {
          setName(res.data.user.name);
          setEmail(res.data.user.email);
          setAvatar(res.data.user.avatar);
          setMobile(res.data.user.mobile);
          setPassword(res.data.user.password);
        } else {
          return;
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = () => {
    const user = { name, email, password, avatar, mobile };
    axios
      .post(`http://localhost:3444/user/update`, user, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success === true) {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-[700px] lg:min-h-screen lg:pt-24 lg:pb-10 flex justify-center items-center  pt-14 bg-gray-200 w-screen ">
      <div className="profile  bg-gray-100  min-w-[360px] p-5 ">
        <h2 className="text-2xl text-center mb-3">User profile</h2>
        <div className="frm-grp mb-4">
          <label htmlFor="name">Name : </label>
          <input
            className="mt-3 w-full  px-3 py-1 rouded-md"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled
          />
        </div>
        <div className="frm-grp mb-4">
          <label htmlFor="email">Email : </label>
          <input
            className="mt-3 w-full  px-3 py-1 rouded-md"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
        </div>
        <div className="frm-grp mb-4">
          <label htmlFor="mobile">Mobile : </label>
          <input
            className="mt-3 w-full  px-3 py-1 rouded-md"
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            disabled
          />
        </div>
        <div className="frm-grp mb-4">
          <label htmlFor="password">Password : </label>
          <input
            className="mt-3 w-full bg-white px-3 py-1 rouded-md"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="frm-grp mb-4">
          <label htmlFor="avatar">Avatar : </label>
          <input
            className="mt-3 w-full bg-white px-3 py-1 rouded-md"
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>
        <input
          onClick={handleClick}
          className="btn bg-green-500 text-gray-50 hover:bg-green-600"
          type="submit"
          value="update profile "
        />
      </div>
    </div>
  );
}

export default Profile;
