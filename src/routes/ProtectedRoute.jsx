import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!userInfo) {
          return <Redirect to="/login" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
