import React, { useState } from "react";
import { Frame, Words, Button } from "arwes";
import { Toaster, toast } from "react-hot-toast";

const ForgetPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
            zIndex: 1,
          },
        }}
      />
      <Frame animate={true} level={3} corners={1} layer="primary" >
       <div style={{ padding: "2em"}}>
       <Words animate  style={{  fontWeight:"bold"}}>
        Recover Your Password
        </Words>
        <br></br>
        <br></br>
        <Words animate  >
        Please enter your email address to reset your password
        </Words>
       </div>
        <form className="login">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              id="email"
              className=" full-width"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="login-btn">
            <Button
              animate
              layer="success"
              type="submit"
              style={{ width: "100%", textAlign: "center" }}
              onClick={handleSubmit}
            >
              Send Reset Link
            </Button>{" "}
          </div>
        </form>
      </Frame>
    </div>
  );
};

export default ForgetPasswordForm;
