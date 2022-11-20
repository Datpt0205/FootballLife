import "./login.css";
import { FcGoogle } from "react-icons/fc";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import Input from "../input/Input";

const LoginLayout = () => {
  return (
    <form className="login">
      <div className="input">
        <label>
          <input id="email" placeholder = "Email" type="email" text="Email" />
          <input id="password" placeholder = "Password" type="password" text="Password" />
          <div className="login_btn">
            <button>login</button>
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
