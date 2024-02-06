import React from "react";
import { Helmet } from "react-helmet";
import ProfilePanel from "../../components/profile/Profile";

const Profile = () => {
  return (
    <>
      <Helmet title="Profile | AINEXIM" />
      <ProfilePanel/>
    </>
  );
};

export default Profile;
