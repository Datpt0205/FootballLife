import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { useState, useEffect } from "react";
import { isEmpty, isEmail, isLength, isMatch } from "../../helpers/validate";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../input/Input";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  // const initialState = {
  //   username: "",
  //   email: "",
  //   password: "",
  //   cf_password: "",
  // };
  const [visible, setVisible] = useState(false);
  //   const [data, setData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   cf_password: ""
  // });
  //   const { username, email, password, cf_password } = data;

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [cf_password, setCf_password] = useState(null);

  const navigate = useNavigate();

  console.log(username, email, password, cf_password);

  // const handleChange = (e) => {
  //   setData((prev) => ({...prev, [e.target.id]: e.target.value}));
  //   // setData({...data, [e.target.id]: e.target.value });
  // };

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //check fields
      if (isEmpty(username) || isEmpty(password))
        return toast("Please fill in all fields.", {
          className: "toast-failed",
          bodyClassName: "toast-failed",
        });
      //check email
      if (!isEmail(email))
        return toast("Please enter a valid email address.", {
          className: "toast-failed",
          bodyClassName: "toast-failed",
        });
      //check password
      if (isLength(password))
        return toast("Password must be at least 6 characters.", {
          className: "toast-failed",
          bodyClassName: "toast-failed",
        });
      // check match
      if (!isMatch(password, cf_password))
        return toast("Password did not match.", {
          className: "toast-failed",
          bodyClassName: "toast-failed",
        });
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      toast(res.data.msg, {
        className: "toast-success",
        bodyClassName: "toast-success",
      });
    } catch (err) {
      toast(err.response.data.msg, {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    }
    // handleReset();
  };

  // const handleReset = () => {
  //   Array.from(document.querySelectorAll("input")).forEach(
  //     (input) => (input.value = "")
  //   );
  //   setData({ ...data, username: "", email: "", password: "", cf_password: "" });
  // };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="input">
          <label>
            <input
              id="username"
              type="text"
              text="Username"
              placeholder="Username"
              required={true}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              id="email"
              type="text"
              text="Email"
              placeholder="Email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id="password"
              type="password"
              text="Password"
              required={true}
              placeholder = "Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              id="cf_password"
              type="password"
              text="Confirm Password"
              placeholder = "Confirm Password"
              required={true}
              onChange={(e) => setCf_password(e.target.value)}
            />
          </label>
        </div>
        {/* <input className = "secondary-button" type= "submit" value="REGISTER" /> */}
        <div className="login_btn">
          <button type="submit">register</button>
        </div>
      </form>
    </>
  );
};

export default Register;
