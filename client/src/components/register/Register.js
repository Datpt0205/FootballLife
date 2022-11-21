import { useState } from "react";
import { isEmpty, isEmail, isLength, isMatch } from "../../helpers/validate";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";

const Register = () => {

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [cf_password, setCf_password] = useState(null);

  console.log(username, email, password, cf_password);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    try {
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
  };

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
              id="cf_password"
              type="password"
              text="Confirm Password"
              placeholder="Confirm Password"
              onChange={(e) => setCf_password(e.target.value)}
            />
          </label>
        </div>
        <div className="login_btn">
          <button type="submit">register</button>
        </div>
      </form>
    </>
  );
};

export default Register;
