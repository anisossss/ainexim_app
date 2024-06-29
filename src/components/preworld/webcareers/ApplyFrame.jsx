import React, { useState } from "react";
import { Highlight, withStyles } from "arwes";
import { Frame, Button, Words } from "arwes";
import axios from "axios";
import { CONSTANTS } from "../../../constants/api";
import { selectSelectedJob } from "../../../redux/Job/jobSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const styles = () => ({
  "@media (max-width: 800px)": {
    root: {
      margin: "0 12px",
    },
  },
  modalFrame: {
    width: "100%",
    margin: "auto",
    maxWidth: "600px",
  },
});
const ApplyFrame = (props) => {
  const { classes } = props;

  const selectedJob = useSelector(selectSelectedJob);
  const location = useLocation();
  const programId = location.pathname.split("/").pop();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
    setResumeFileName(file.name);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("jobTitle", selectedJob);
    formData.append("applicantName", name);
    formData.append("email", email);
    formData.append("resume", resume);
    formData.append("coverLetter", coverLetter);
    formData.append("programId", programId);

    try {
      const response = await axios.post(
        `${CONSTANTS.API_URL}/user/apply`,
        formData
      );
      toast.success(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while submitting the form");
      }
    }
  };

  return (
    <Frame className={classes.modalFrame}>
      <div style={{ padding: "1em" }}>
        <Highlight animate>Apply for {selectedJob} Career</Highlight>
        <br></br>
        <br></br>
        <Words>
          Enter your information and upload your resume and a cover letter
        </Words>
        <br></br>
        <br></br>
        <div className="form-group">
          <label htmlFor="resume">Your Resume: </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            name="resume"
            id="resume"
            style={{
              display: "none",
            }}
            onChange={handleFileChange}
            required
          />
          <Button
            layer={"secondary"}
            style={{
              marginLeft: "1em",
            }}
            onClick={() => document.getElementById("resume").click()}
          >
            {resumeFileName ? resumeFileName : "Upload"}{" "}
          </Button>
        </div>
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
          <Button type="button" layer="secondary">
            Cancel
          </Button>

          <Button layer="success" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </Frame>
  );
};

export default withStyles(styles)(ApplyFrame);
