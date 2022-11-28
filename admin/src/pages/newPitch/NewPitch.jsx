import "./newPitch.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { pitchInputs } from "../../formSource";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

const NewPitch = () => {
  const [info, setInfo] = useState("");
  const [pitchCenterId, setPitchCenterId] = useState(undefined);
  const [pitches, setPitches] = useState([]);

  const { data, loading, error } = useFetch("/pitchCenters");
  console.log(data)

  const handleChange = (e) => {
    setInfo((pre) => ({ ...pre, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const pitchNumbers = pitches.split(",").map((pitch) => ({ number: pitch }));
    try {
      await axios.post(`/pitches/${pitchCenterId}`, { ...info, pitchNumbers });
      alert("Create new pitch successfully!")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add new Pitch</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {pitchInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange = {handleChange}
                  />
                </div>
              ))}

              <div className="formInput">
                <label>Pitches</label>
                <textarea
                  onChange={(e) => setPitches(e.target.value)}
                  placeholder="Give comma between pitch number"
                />
              </div>

              <div className="formInput">
                <label>Choose a Pitch Center</label>
                <select
                  id="pitchCenterId"
                  onChange={(e) => setPitchCenterId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((pitchCenter) => {
                        return(
                        <option key ={pitchCenter._id} value={pitchCenter._id}>
                          {pitchCenter.name}
                        </option>)
                      })}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPitch;
