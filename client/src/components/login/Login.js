import "./login.css";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"

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
              <button type = "submit">login</button>
              <button className="btn-alt">
                sign in <FcGoogle />
              </button>
            </div>
          </label>
        </div>
      </form>
  );
};

export default LoginLayout;
