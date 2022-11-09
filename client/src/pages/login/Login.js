import "./Login.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logImg from "../../images/log.svg"
import registerImg from "../../images/register.svg"

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   setCredentials((pre) => ({ ...pre, [e.target.id]: e.target.value }));
  // };

  const handleClickSignIn = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {username, password});
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleClickSignUp = async (e) => {
    e.preventDefault()
    try{

      const res = await axios.post("/auth/register", {username, password, email})
      
      const success = res.status === 201

      if(success) navigate ('/login')

      window.location.reload()
    }catch(err){
      console.log(err);
    }
  }

  const container = document.querySelector(".container");

  const handleSignUp = () => {
    container.classList.add("sign-up-mode");
  };
  const handleSignIn = () => {
    container.classList.remove("sign-up-mode");
  };

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              button = "true"
              type="submit"
              value="Login"
              className="btn solid"
              onClick={handleClickSignIn}
            />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" id = "username" onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <input type="submit" className="btn" value="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Create new account? </h3>
            <p>
              If you do not have an account to log in, click the button below to
              go to the new account registration page!
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={handleSignUp}
            >
              Sign up
            </button>
          </div>
          <img src={logImg} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Already have an account ?</h3>
            <p>
            Click the button below to return to the input page!
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={handleSignIn}
            >
              Sign in
            </button>
          </div>
          <img src={registerImg} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
