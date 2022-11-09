import "./login.css";
import { FcGoogle } from "react-icons/fc";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import Input from "../input/Input";

const LoginLayout = () => {
  return (
    <form className="login">
      <Input type="email" text="Email" />
      <Input type="password" text="Password" />
      <div className="login_btn">
        <button>login</button>
        <button className="btn-alt">
          sign in <FcGoogle />
        </button>
      </div>
    </form>
  );
};

export default LoginLayout;
