import Profile from "../../components/profile/Profile";
import "./profileLayout.css";
import { useState } from "react";

const ProfileLayout = () => {
  const [sidebar, setSidebar] = useState(false);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className="profilelayout">
        {/* profile */}
        <div className="profilelayout_content-profile">
          <Profile />
        </div>
      </div>
  );
};

export default ProfileLayout;
