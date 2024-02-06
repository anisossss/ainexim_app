import React from "react";
import { Helmet } from "react-helmet";
import ProfileSettingsPanel from "../../components/profile/ProfileSettings";
const ProfileSettings = () => {
  return (
    <>
      <Helmet title="Profile Settings | AINEXIM" />
      <ProfileSettingsPanel />
    </>
  );
};

export default ProfileSettings;
