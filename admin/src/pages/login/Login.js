import './login.css'
import { useState, useContext } from 'react'
import {AuthContext} from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import LoginLayout from '../../components/loginLayout/LoginLayout'

const Login = () => {
//     const [credentials, setCredentials] = useState({
//         username: undefined,
//         password: undefined,
//     })

//     const { loading, error, dispatch } = useContext(AuthContext);
    
//     const navigate = useNavigate()

//     const handleChange = (e) => {
//         setCredentials(pre=>({...pre, [e.target.id]: e.target.value}))
//     }

//     const handleClick = async (e) => {
//         e.preventDefault()
//         dispatch({type:"LOGIN_START"})
//         try{
//             const res = await axios.post("/auth/login", credentials)
//             if(res.data.isAdmin){
//               dispatch({type:"LOGIN_SUCCESS", payload:res.data.details})
//               navigate("/")
//           }else{
//               dispatch({type:"LOGIN_FAILURE", payload: {message: "You are not allowed!"}})
//           }
//         }catch(err){
//             dispatch({type:"LOGIN_FAILURE", payload:err.response.data})
//         }
//     }
//     return (
//       <div className="authlayout">
//         {/* logo */}
//         <div className="authlayout_logo">
//           <img src="./assets/img/shuttle.svg" alt="logo" />
//         </div>
//         {/* form */}
//         <LoginLayout />
//         {/* actions */}
//         <div className="authlayout_actions">
//           <p className="authlayout_actions-l">register?</p>
//           <p className="authlayout_actions-r">login ?</p>
//         </div>
//       </div>
//     )
}

export default Login