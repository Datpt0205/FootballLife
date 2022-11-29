import "./updatePitchCenter.scss";
import { useState } from "react";
import { makeRequest } from "../../axios";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import axios from "axios";

const UpdatePitchCenter = ({ setOpenUpdate, user }) => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const { data, loading, error } = useFetch(`/pitchCenters/find/${id}`);
    const [info, setInfo] = useState({});

  const handleClick = async (e) => {
    e.preventDefault();
    try {

      const updatePitchCenter = {
        ...info,
      };

      await axios.put(`/pitchCenters/${id}`, updatePitchCenter);
      alert("Update pitch center successfully!");
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
          {/* <input id = "file" type="file" name = "file" onChange={(e) => setFile(e.target.files[0])} /> */}
          <input
            id="name"
            type="text"
            name="name"
            placeholder= {data.name}
            onChange={handleChange}
          />
          <input id="type" type="text" name="type" placeholder = {data.type} onChange={handleChange} />
          <input id="city" type="text" name="city" placeholder =  {data.city} onChange={handleChange} />
          <input
            id="address"
            type="text"
            name="address"
            placeholder =  {data.address}
            onChange={handleChange}
          />
          <input id="distance" type="text" name="distance" placeholder =  {data.distance} onChange={handleChange} />
          <input id="cheapestPrice" type="text" name="cheapestPrice" placeholder =  {data.cheapestPrice} onChange={handleChange} />
          <input id="description" type="text" name="description" placeholder =  {data.description} onChange={handleChange} />
        </form>
        <button type="submit" onClick={handleClick}>UPDATE</button>
      </div>
    </div>
  );
};

export default UpdatePitchCenter;
