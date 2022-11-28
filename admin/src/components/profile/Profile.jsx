import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {updateInputs} from '../../formSource'
import useFetch from "../../hooks/useFetch";
import { isLength, isMatch } from "../../helpers/validate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";

const initialState = {
  username: '',
  password: '',
  confirmPassword: '',
}
const Profile = () => {

  // const location = useLocation();
  // const id = location.pathname.split("/")[2];
  // const { data, loading, error } = useFetch(`/users/find/${id}`);
  // const {user} = useContext(AuthContext)
  const [data, setData] = useState(initialState)
  const {username, password, confirmPassword} = data
  const [avatar, setAvatar] = useState(false);
  const { user, token, dispatch } = useContext(AuthContext);

  const [file, setFile] = useState("");
  // const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setData((pre) => ({ ...pre, [e.target.id]: e.target.value }));
  };

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      // get file
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("avatar", file);

      // upload to cloudinary
      const res = await axios.post("/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
        onUploadProgress: (x) => {
          if (x.total < 1024000)
            return toast("Uploading", {
              className: "bg-upload",
              bodyClassName: "bg-upload",
              autoClose: 7000,
            });
        },
      });
      setAvatar(res.data.url);
    } catch (err) {
      toast(err.response.data.msg, {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    }
  };

  const updateInfo = async () => {
    try {
      const res = await axios.patch(
        "/auth/user_update",
        {
          username: username ? username : user.username,
          avatar: avatar ? avatar : user.avatar,
        },
        {
          headers: { Authorization: token },
        }
      );
      const updatedUser = await axios.get("/auth/user", {
        headers: { Authorization: token },
      });
      dispatch({ type: "GET_USER", payload: updatedUser.data });
      return toast(res.data.msg, {
        className: "toast-success",
        bodyClassName: "toast-success",
      });
    } catch (err) {
      toast(err.response.data.msg, {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    }
  };

  const updatePassword = async () => {
    // check password length
    if (isLength(password))
      return toast("Password must be at least 6 characters.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    // check password match
    if (!isMatch(password, confirmPassword))
      return toast("Password did not match.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    try {
      const res = await axios.post(
        "/auth/reset_pass",
        { password },
        {
          headers: { Authorization: token },
        }
      );
      return toast(res.data.msg, {
        className: "toast-success",
        bodyClassName: "toast-success",
      });
    } catch (err) {
      return toast(err.response.data.msg, {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username || avatar) {
      updateInfo();
    }
    if (password) {
      updatePassword();
    }
  };

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   const data = new FormData();
  //   data.append("file", file);
  //   data.append("upload_preset", "upload");
  //   try {
  //     const uploadRes = await axios.post(
  //       "https://api.cloudinary.com/v1_1/football/image/upload",
  //       data
  //     );
  //     const { url } = uploadRes.data;

  //     const newUser = {
  //       ...info,
  //       img: url,
  //     };

  //     await axios.post("/users/createUser", newUser);
  //     alert("Create new user successfully!");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{data.username}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit = {handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

                {updateInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button type = "submit ">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
