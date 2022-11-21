import "./login.css";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { toast } from "react-toastify";

const LoginLayout = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((pre) => ({ ...pre, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "LOGIN_START" });
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const googleSuccess = async (res) => {
    const token = res?.tokenId;
    try {
      await axios.post("/auth/google_signing", { tokenId: token });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
    } catch (err) {
      toast(err.response.data.msg, {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    }
  };

  const googleError = async () => {
    toast("There was an error signing in, Please try again!", {
      className: "toast-failed",
      bodyClassName: "toast-failed",
    });
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <div className="input">
        <label>
          <input
            id="username"
            placeholder="Username"
            type="text"
            text="Username"
            required={true}
            onChange={handleChange}
          />
          <input
            id="password"
            placeholder="Password"
            type="password"
            text="Password"
            required={true}
            onChange={handleChange}
          />
          <div className="login_btn">
            <button type="submit">login</button>
            <GoogleLogin
              clientId={process.env.REACT_APP_G_CLIENT_ID}
              render={(renderProps) => (
                <button
                  className="btn-alt"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  sign in <FcGoogle />
                </button>
              )}
              cookiePolicy={"single_host_origin"}
              onSuccess={googleSuccess}
              onFailure={googleError}
            />
          </div>
        </label>
      </div>
    </form>
  );
};

export default LoginLayout;
