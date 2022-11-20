import "./activateLayout.css";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useParams } from "react-router-dom";
import {useEffect} from "react"

const ActivateLayout = ({ history }) => {

  const {activation_token} = useParams()

  useEffect(() => {
    //check token is valid
    if(activation_token) {
      const activateUser = async () => {
        try{
          const res = await axios.post('/auth/activation', {activation_token});
          toast(res.data.msg, {
            className: "toast-success",
            bodyClassName: "toast-success",})
        }catch(err){
            toast(err.response.data.msg, {
            className: "toast-failed",
            bodyClassName: "toast-failed",
        });
      }
    };
    activateUser()
  }
  }, [activation_token]);

  const handleClick = () => {
    history.push("/login");
  };

  return (
    <div className="activate">
      <ToastContainer />
      <p>
        ready to login ? 👉🏻 <span onClick={handleClick}>Here</span>
      </p>
    </div>
  );
};

export default ActivateLayout;