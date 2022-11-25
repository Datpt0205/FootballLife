import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import {isEmpty, isEmail} from "../../helpers/validate"
import { ToastContainer, toast } from "react-toastify";
import { useState, useContext } from "react";

const Forgot = () => {

  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    //check fields
    if (isEmpty(email))
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
    try{
      await axios.post('/auth/forgot_password', {email})
      return toast("Please check your email.", {
        className: "toast-success",
        bodyClassName: "toast-success",
      })
    }catch(err){
      toast(err.response.data.msg, {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      })
    }

  }
  return (
    <>
    <ToastContainer />
    <form onSubmit = {handleSubmit}>
      <div className="input">
        <label>
          <input id="email" placeholder = "Email" type="text" text="Email" onChange={(e) => setEmail(e.target.value)} />
          <div className="login_btn">
            <button>send</button>
          </div>
        </label>
      </div>
    </form>
    </>
  );
};

export default Forgot;
