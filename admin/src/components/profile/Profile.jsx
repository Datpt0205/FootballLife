import { AiFillCamera } from "react-icons/ai";
import { useRef, useState } from "react";
import "./profile.css";

const Profile = () => {
  const inputFile = useRef(null);
  const [visible, setVisible] = useState(false);

  const handleInput = () => {
    inputFile.current.click();
  };

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <div className="profile_avatar">
      <div className="profile_avatar-wrapper" onClick={handleInput}>
      <AiFillCamera />
      <input
          type="file"
          name="avatar"
          ref={inputFile}
          className="profile_avatar-input"
        />
        <img
          src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
          className="avatar"
        />
    </div>
      <form className="profile_input">
        <div className="profile_input-form">
          <input type="text" text="Name" />
          <input type="text" text="Email" />
          <input
            type="password"
            text="Password"
            handleClick={handleClick}
          />
          <input
            type="password"
            text="Confirm Password"
            handleClick={handleClick}
          />
          <div className="login_btn">
            <button>update</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
