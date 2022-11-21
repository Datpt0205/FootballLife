import { useState } from "react";

const Reset = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <form>
      <input
        type = "password"
        text="Password"
        handleClick={handleClick}
      />
      <input
        type="password"
        text="Confirm Password"
        handleClick={handleClick}
      />
      <div className="login_btn">
        <button type = "submit">reset</button>
      </div>
    </form>
  );
};

export default Reset;