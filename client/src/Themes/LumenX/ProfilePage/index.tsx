import React, { useState } from "react";
import ProfileForm from "./ProfileFrom";
import "./ProfilePage.css";
import { formatDateLong } from "../../../utils/DateFormat";

const ProfilePage = () => {
  const [activeSinceDate, setActiveSinceDate] = useState<any>("");
  return (
    <div className="profileSection">
      <div>
        <h1>Your Profile</h1>
        <p>Active since: {formatDateLong(activeSinceDate)}</p>
      </div>
      <ProfileForm setActiveSinceDate={setActiveSinceDate} />
    </div>
  );
};

export default ProfilePage;
