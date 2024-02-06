import React from "react";
import { Helmet } from "react-helmet";
import UpdateProfilePanel from "../../components/profile/UpdateProfile";
const UpdateProfile = () => {
  return (
    <>
      <Helmet title="Update Profile | AINEXIM" />
      <UpdateProfilePanel />
    </>
  );
};

export default (UpdateProfile);
