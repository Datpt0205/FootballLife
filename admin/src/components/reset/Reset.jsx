import { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { isEmpty, isEmail, isMatch, isLength } from "../../helpers/validate";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Reset = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //check field
    if (isEmpty(password) || isEmpty(confirmPassword))
      return toast("Please fill in all fields.", {
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
    if (!isMatch(password, confirmPassword))
      return toast("Password did not match.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    try {
      await axios.post(
        "/auth/reset_password",
        { password },
        { headers: { Authorization: token } }
      );
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
      <div className="input">
        <label>
          <form onSubmit={handleSubmit}>
            <input
              id="password"
              type="password"
              text="Password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              id="confirmPassword"
              type="password"
              text="Confirm Password"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="login_btn">
              <button type="submit">reset</button>
            </div>
          </form>
        </label>
      </div>
    </>
  );
};

export default Reset;
