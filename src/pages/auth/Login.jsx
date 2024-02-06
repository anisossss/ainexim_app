import React from "react";
import { Helmet } from "react-helmet";
import UserLoginForm from "../../components/auth/UserLoginForm";

const Login = () => {
  return (
    <>
      <Helmet title="Login | AINEXIM" />
      <UserLoginForm />
    </>
  );
};

export default Login;
