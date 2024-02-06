import React from "react";
import { Helmet } from "react-helmet";
import ForgetPasswordForm from "../../components/auth/ForgetPasswordForm";

const ForgotPassword = () => {
  return (
    <>
      <Helmet title="Forgot Password | AINEXIM" />
      <ForgetPasswordForm />
    </>
  );
};

export default ForgotPassword;
