import "./update.scss";
import { useState } from "react";
import { makeRequest } from "../../axios";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Update = ({ setOpenUpdate, user }) => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const { data, loading, error } = useFetch(`/users/find/${id}`);
    const [texts, setTexts] = useState({
    // email: user.email,
    // password: user.password,
    // username: user.username,
    // city: user.city,
    // country: user.country,
    // phone: user.phone,
    email: "",
    password: "",
    username: "",
    city: "",
    country: "",
    phone: "",
  });
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/football/image/upload",
        data
      );
      const { url } = uploadRes.data;

      const updateUser = {
        ...info,
        img: url,
      };

      await axios.put(`/users/${id}`, updateUser);
      alert("Update user successfully!");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="update">
      <div className="wrapper">
        <button onClick={() => setOpenUpdate(false)} style ={{marginLeft: 900}}>X</button>
        <h1>Update your profile</h1>
        <form>
          <input id = "file" type="file" name = "file" onChange={(e) => setFile(e.target.files[0])} />
          <input
            id="username"
            type="text"
            name="username"
            placeholder= {data.username}
            onChange={handleChange}
          />
          <input id="email" type="text" name="email" placeholder = {data.email} onChange={handleChange} />
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <input id="city" type="text" name="city" placeholder =  {data.city} onChange={handleChange} />
          <input
            id="country"
            type="text"
            name="country"
            placeholder =  {data.country}
            onChange={handleChange}
          />
          <input id="phone" type="text" name="phone" placeholder =  {data.phone} onChange={handleChange} />
        </form>
        <button type="submit" onClick={handleClick}>UPDATE</button>
      </div>
    </div>
  );
};

export default Update;
