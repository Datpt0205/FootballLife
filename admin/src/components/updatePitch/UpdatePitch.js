import "./updatePitch.scss";
import { useState } from "react";
import { makeRequest } from "../../axios";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import axios from "axios";

const UpdatePitchCenter = ({ setOpenUpdate, user }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/pitches/find/${id}`);
  const [info, setInfo] = useState({});

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const updatePitch = {
        ...info,
      };

      await axios.put(`/pitches/${id}`, updatePitch);
      alert("Update pitch successfully!");
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
        <button
          onClick={() => setOpenUpdate(false)}
          style={{ marginLeft: 900 }}
        >
          X
        </button>
        <h1>Update pitch</h1>
        <form>
          <input
            id="title"
            type="text"
            name="title"
            placeholder={data.title}
            onChange={handleChange}
          />
          <input
            id="type"
            type="text"
            name="type"
            placeholder={data.type}
            onChange={handleChange}
          />

          <input
            id="price"
            type="text"
            name="price"
            placeholder={data.price}
            onChange={handleChange}
          />
          <input
            id="description"
            type="text"
            name="description"
            placeholder={data.description}
            onChange={handleChange}
          />
        </form>
        <button type="submit" onClick={handleClick}>
          UPDATE
        </button>
      </div>
    </div>
  );
};

export default UpdatePitchCenter;
