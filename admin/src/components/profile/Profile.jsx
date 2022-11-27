import { AiFillCamera } from "react-icons/ai";
import { useRef, useState, useContext } from "react";
import "./profile.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLength, isMatch } from "../../helpers/validate";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const inputFile = useRef(null);
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(false);
  const { user, token, dispatch } = useContext(AuthContext);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  

  const handleInput = () => {
    inputFile.current.click();
  };

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      // get file
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("avatar", file);

      // upload to cloudinary
      const res = await axios.post("/api/upload", formData, {
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
        `/users/update`,
        {
          username: username ? username : user.username,
          avatar: avatar ? avatar : user.avatar,
        },
        {
          headers: { Authorization: token },
        }
      );
      const updatedUser = await axios.get("/users", {
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
        "/auth/reset_password",
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

  return (
    <>
    <ToastContainer />
    <div className="profile">
      <div className="profile_avatar">
        <div className="profile_avatar-wrapper" onClick={handleInput}>
          <AiFillCamera />
          <img
            src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="avatar"
          />
        </div>
        <input
          type="file"
          name="avatar"
          ref={inputFile}
          className="profile_avatar-input"
          onChange={changeAvatar}
        />
      </div>
      <form className="profile_input" onSubmit={handleSubmit}>
        <div className="input">
          <label>
            <div className="profile_input-form">
              <input
                id="username"
                type="text"
                text="Name"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                id="email"
                type="text"
                text="Email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                id="password"
                type="password"
                text="Password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                id="confirmPassword"
                type="password"
                text="Confirm Password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="login_btn">
                <button>update</button>
              </div>
            </div>
          </label>
        </div>
      </form>
    </div>
    </>
  );
};

export default Profile;
