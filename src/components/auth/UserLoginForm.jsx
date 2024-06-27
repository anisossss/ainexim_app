import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Frame, Words, Button } from "arwes";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { login } from "../../redux/Auth/authOperations";
import { useValidation } from "../../helpers";
import { useAuth } from "../../hooks";
import { setError } from "../../redux/Auth/authSlice";
import { selectIsLoading } from "../../redux/Auth/authSelectors";
import { toast } from "react-toastify";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const UserLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { error } = useAuth();
  const { loginValidationSchema } = useValidation();
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const [fingerprint, setFingerprint] = useState("");

  useEffect(() => {
    // Initialize an agent at application startup.
    const fpPromise = FingerprintJS.load();

    // Get the visitor identifier when you need it.
    fpPromise
      .then((fp) => fp.get())
      .then((result) => {
        // This is the visitor identifier:
        const visitorId = result.visitorId;
        setFingerprint(visitorId);
        console.log("fingerprint", fingerprint);
      });
  }, []);

  const handleSubmitForm = async (values) => {
    try {
      const res = await dispatch(login({ ...values, fingerprint })).unwrap();
      toast.success("You are logged in successfully");
    } catch (rejectedValueOrSerializedError) {
      toast.error(rejectedValueOrSerializedError);
    }
  };

  return (
    <div className="form-container">
      <Frame animate={true} level={3} corners={1} layer="primary">
        <Words animate style={{ padding: "2em", fontWeight: "bold" }}>
          Login to AINEXIM, Your Portal to Seamless Development
        </Words>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => handleSubmitForm(values)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form className="login" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  id="email"
                  className=" full-width"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <div className="alert error">{errors.email}</div>
                )}
              </div>
              <br />
              <div className="form-group pass-box">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    id="password"
                    className="full-width"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors.password && touched.password && (
                  <div className="alert error">{errors.password}</div>
                )}
              </div>

              <div className="forgot-link">
                <Link to="/forgot-password" className="pass-link">
                  <span style={{ fontSize: "15px" }}>Forgot password?</span>
                </Link>
              </div>

              <div className="login-btn">
                <Button
                  animate
                  layer="success"
                  style={{
                    width: "100%",
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  Login
                  {isLoading && (
                    <div
                      className="loadingio"
                      style={{ position: "absolute", width: "1%" }}
                    >
                      <div className="loading">
                        <div></div>
                      </div>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Frame>
    </div>
  );
};

export default UserLoginForm;
