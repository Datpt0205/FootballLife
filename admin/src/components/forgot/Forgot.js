import Input from "../input/Input";

const Forgot = () => {
  return (
    <form>
      <div className="input">
        <label>
          <input placeholder = "Email" type="text" text="Email" />
          <div className="login_btn">
            <button>send</button>
          </div>
        </label>
      </div>
    </form>
  );
};

export default Forgot;
