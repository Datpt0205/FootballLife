import './login.css'
import { useState, useContext } from 'react'
import {AuthContext} from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
// import FontAwesomeIcon from ''

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    })

    const { loading, error, dispatch } = useContext(AuthContext);
    
    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials(pre=>({...pre, [e.target.id]: e.target.value}))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try{
            const res = await axios.post("/auth/login", credentials)
            if(res.data.isAdmin){
              dispatch({type:"LOGIN_SUCCESS", payload:res.data.details})
              navigate("/")
          }else{
              dispatch({type:"LOGIN_FAILURE", payload: {message: "You are not allowed!"}})
          }
        }catch(err){
            dispatch({type:"LOGIN_FAILURE", payload:err.response.data})
        }
    }

//     const signUpButton = document.getElementById('signUp');
// const signInButton = document.getElementById('signIn');
// const container = document.getElementById('container');

// signUpButton.addEventListener('click', () => {
// 	container.classList.add("right-panel-active");
// });

// signInButton.addEventListener('click', () => {
// 	container.classList.remove("right-panel-active");
// });

    return (
    // <div className="container" id="container">
    // //     <div className="form-container sign-up-container">
    // //         <form>
    // //             <h1>Create Account</h1>
    // //             <div className="social-container">
    // //                 <a href="/" className="social"><i className="fab fa-facebook-f"></i></a>
    // //                 <a href="/" className="social"><i className="fab fa-google-plus-g"></i></a>
    // //                 <a href="/" className="social"><i className="fab fa-linkedin-in"></i></a>
    // //             </div>
    // //             <span>or use your email for registration</span>
    // //             <input type="text" placeholder="Name" />
    // //             <input type="email" placeholder="Email" />
    // //             <input type="password" placeholder="Password" />
    // //             <button>Sign Up</button>
    // //         </form>
    // //     </div>
    // //     <div className="form-container sign-in-container">
    // //         <form action="#">
    // //             <h1>Sign in</h1>
    // //             <div className="social-container">
    // //                 <a href="/" className="social"><i className="fab fa-google-plus-g"></i></a>
    // //                 <a href="/" className="social"><i className="fab fa-google-plus-g"></i></a>
    // //                 <a href="/" className="social"><i className="fab fa-linkedin-in"></i></a>
    // //             </div>
    // //             <span>or use your account</span>
    // //             <input  type="text" placeholder="username" id="username" onChange={handleChange} />
    // //             <input type="password" placeholder="password" id="password" onChange={handleChange} />
    // //             <a href="/">Forgot your password?</a>
    // //             <button disable={loading} onClick={handleClick}>Sign In</button>
    // //         </form>
    // //     </div>
    // //     <div className="overlay-container">
    // //         <div className="overlay">
    // //             <div className="overlay-panel overlay-left">
    // //                 <h1>Welcome Back!</h1>
    // //                 <p>To keep connected with us please login with your personal info</p>
    // //                 <button className="ghost" id="signIn">Sign In</button>
    // //             </div>
    // //             <div className="overlay-panel overlay-right">
    // //                 <h1>Hello, Friend!</h1>
    // //                 <p>Enter your personal details and start journey with us</p>
    // //                 <button className="ghost" id="signUp">Sign Up</button>
    // //             </div>
    // //         </div>
    // //     </div>
    // // </div>


    <div className="login" >
        <div className="lContainer" >
            <span className="">Slider Sign In/Sign Up Form</span>
            <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput"></input>
            <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput"></input>
            <button disable={loading} onClick={handleClick} className="lButton">Login</button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
    )
};

export default Login