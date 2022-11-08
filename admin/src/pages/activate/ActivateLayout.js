
import "./activateLayout.css";

const ActivateLayout = ({ history }) => {
  const handleClick = () => {
    history.push("/login");
  };

  return (
    <div className="activate">
      <p>
        ready to login ? 👉🏻 <span onClick={handleClick}>Here</span>
      </p>
    </div>
  );
};

export default ActivateLayout;