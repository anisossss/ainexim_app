import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Frame, Words, Button } from "arwes";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Loggedin successfully!");
  };

  return (
    <div className="form-container">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            border: "4px solid #029DBB",
            background: "#484D4E",
            color: "#fff",
            borderRadius: 0,
          },
        }}
      />
      <Frame animate={true} level={3} corners={1} layer="primary">
    <div style={{ padding: "2em"}}>

        <Words  style={{  fontWeight:"bold"}}>
        Set a new password
        </Words>
        <br></br>
      
    </div>
        <form className="login">
          <div className="form-group pass-box">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                id="password"
                className="full-width"
                value={formData.password}
                onChange={handleInputChange}
              />
              <span className="password-toggle" onClick={handlePasswordToggle}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="form-group pass-box">
            <label htmlFor="password">Confirm your new password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                id="password"
                className="full-width"
                value={formData.password}
                onChange={handleInputChange}
              />
              <span className="password-toggle" onClick={handlePasswordToggle}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
        

          <div className="login-btn">
            <Button
              animate
              layer="success"
              type="submit"
              style={{ width: "100%", textAlign: "center" }}
              onClick={handleSubmit}
            >
              Reset
            </Button>{" "}
          </div>
        </form>
      </Frame>
    </div>
  );
};

export default ResetPasswordForm;
