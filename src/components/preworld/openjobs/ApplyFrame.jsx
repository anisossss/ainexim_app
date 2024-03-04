import React, { useState } from "react";
import { withStyles } from "arwes";
import { Frame, Button, Words } from "arwes";
import axios from "axios";
import { CONSTANTS } from "../../../constants/api";
import { Link } from "react-router-dom";
const styles = () => ({
  "@media (max-width: 800px)": {
    root: {
      margin: "0 12px",
    },
  },
  modalFrame: {
    width: "100%",
    margin: "auto",
    maxWidth: "600px", // Added 'px' here
  },
});

const ApplyFrame = (props) => {
  const { classes } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Example of sending form data using Axios
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("resume", resume);
    formData.append("coverLetter", coverLetter);

    try {
      const response = await axios.post(CONSTANTS.API_URL, formData);
      console.log(response.data);
      // Handle success, show confirmation, or redirect
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, show error message to the user
    }
  };

  return (
    <Frame className={classes.modalFrame}>
      <form onSubmit={handleSubmit}>
        <div style={{ padding: "1em" }}>
          <Words animate>Apply for Frontend Developer job</Words>
          <br></br>
          <br></br>
          <Words>
            Enter your information and upload your resume and a cover letter
          </Words>
          <br></br>
          <br></br>
          <label>Name:</label>
          <br></br>{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%" }}
          />
          <br></br>
          <br></br>
          <label>Email:</label>
          <br></br>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%" }}
            required
          />
          <br></br>
          <br></br>
          <label>Resume:</label>
          <br></br>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            style={{ width: "100%" }}
            required
          />
          <br></br>
          <br></br>
          <label>Cover Letter:</label>
          <br></br>
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
            style={{ height: "10em", width: "100%", background: "#000" }}
          />
          <br></br>
          <br></br>
          <div className="btns_confirm">
            <Link to="/dashboard">
              <Button layer="success">Submit</Button>
            </Link>
            <Button type="button" layer="secondary">
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </Frame>
  );
};

export default withStyles(styles)(ApplyFrame);
