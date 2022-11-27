import "./newPitchCenter.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { pitchCenterInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewPitchCenter = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const { data, loading, error } = useFetch("/pitches");
  const [pitches, setPitches] = useState([]);

  console.log(data)

  const handleChange = (e) => {
    setInfo((pre) => ({ ...pre, [e.target.id]: [e.target.value] }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setPitches(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          // data.append("api_key", "748172775484731")
          // data.append("api_secret", "gcboRyjbNrJSGnNm-OYqkpv_HY0")
          // data.append("cloud_name", "dlgnrv8dy")
          data.append("file", file)
          data.append("upload_preset", "upload")
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/refu/image/upload",
            data
          );
          const { url } = uploadRes.data;
          return url;
        })
      );

      const newPitchCenter = {
        ...info,
        pitches,
        photos: list,
      };

      await axios.post("/pitchCenters", newPitchCenter);
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
          <h1>Add New Pitch Center</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {pitchCenterInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectPitches">
                <label>Pitches</label>
                <select id="pitches" multiple onChange={handleSelect}>
                  {loading
                    ? "Loading"
                    : data &&
                      data.map((pitch) => {
                        return(
                        <option key={pitch._id} value={pitch._id}>
                          {pitch.title}
                        </option>
                        )
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

export default NewPitchCenter;
