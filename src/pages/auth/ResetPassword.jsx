import React from "react";
import { Helmet } from "react-helmet";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <>
      <Helmet title="Reset Password | AINEXIM" />
      <ResetPasswordForm />
    </>
  );
};

export default ResetPassword;
