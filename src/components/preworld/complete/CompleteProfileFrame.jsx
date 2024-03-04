import React, { useState } from "react";
import { Frame, Words, Button } from "arwes";
import { withStyles } from "arwes";
import { Link } from "react-router-dom";
const styles = () => ({
  "@media (max-width: 800px)": {
    root: {
      margin: "0 12px",
    },
  },
  quizContainer: {
    padding: "20px",
    height: "80vh",
    width: "100%",
    overflowY: "auto",
  },
  question: {
    height: "10em",
  },
  buttonContainer: {
    display: "flex",
    width: "20%",
    justifyContent: "space-evenly",
    marginTop: "2em",
  },
  submitButton: {
    textAlign: "right",
  },
  progressBarContainer: {
    height: "5px",
    width: "100%",
    background: "#222",
    position: "relative",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    background: "#029DBB",
    transition: "width 0.3s ease-in-out",
  },
  buttonsContainer: {
    marginTop: "9px",
  },
  modalFrame: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "80%",
    zIndex: 1000,
  },
  modalBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  textArea: {
    border: "1px solid white",
    color: "#fff",
  },
});
const CompleteProfileFrame = (props) => {
  const { classes, className } = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: {
      firstName: "",
      lastName: "",
      jobTitle: "",
    },
    step2: {
      softSkills: "",
      hardSkills: "",
      careerPreference: "",
    },
  });

  const handleVerifyClick = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const stepData = { ...formData[`step${step}`], [name]: value };
    setFormData((prevData) => ({ ...prevData, [`step${step}`]: stepData }));
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <>
      <h3>Complete Your Profile - Step {step}</h3>
      {step === 1 && (
        <>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              placeholder="Anis  "
              name="firstName"
              id="firstName"
              className="full-width"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              placeholder="Khalef"
              name="lastName"
              id="lastName"
              className="full-width"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              name="lastName"
              id="lastName"
              className="full-width"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="anis.khalef98@gmail.com"
              name="email"
              id="email"
              className="full-width"
              value={formData.step1.email}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              name="phoneNumber"
              id="phoneNumber"
              className="full-width"
              value={formData.step1.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              placeholder="Enter your location"
              name="location"
              id="location"
              className="full-width"
              value={formData.step1.location}
              onChange={handleInputChange}
            />
          </div>
        </>
      )}
      {step === 2 && (
        <>
          {/* Existing form fields */}
          <div className="form-group">
            <label htmlFor="education">Education</label>
            <input
              type="text"
              placeholder="Enter your education details"
              name="education"
              id="education"
              className="full-width"
              value={formData.step2.education}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="experience">Experience</label>
            <input
              type="text"
              placeholder="Enter your experience details"
              name="experience"
              id="experience"
              className="full-width"
              value={formData.step2.experience}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="languages">Languages</label>
            <input
              type="text"
              placeholder="Enter languages you speak"
              name="languages"
              id="languages"
              className="full-width"
              value={formData.step2.languages}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="certifications">Certifications</label>
            <input
              type="text"
              placeholder="Enter your certifications"
              name="certifications"
              id="certifications"
              className="full-width"
              value={formData.step2.certifications}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="portfolioLink">Portfolio Link</label>
            <input
              type="text"
              placeholder="Enter your portfolio link"
              name="portfolioLink"
              id="portfolioLink"
              className="full-width"
              value={formData.step2.portfolioLink}
              onChange={handleInputChange}
            />
          </div>
        </>
      )}
      <div className="profile-btn">
        {step === 1 && (
          <Button
            animate
            layer="success"
            type="button"
            onClick={nextStep}
            style={{ width: "100%", textAlign: "center" }}
          >
            Next
          </Button>
        )}
        {step === 2 && (
          <Button
            animate
            layer="success"
            style={{ width: "100%", textAlign: "center" }}
            onClick={handleVerifyClick}
          >
            Complete Profile
          </Button>
        )}
        {step > 1 && (
          <Button
            animate
            layer="primary"
            type="button"
            onClick={prevStep}
            style={{ width: "100%", textAlign: "center", marginTop: "10px" }}
          >
            Previous
          </Button>
        )}
      </div>
      {isModalOpen && (
        <>
          <div
            className={classes.modalBackdrop}
            onClick={handleCloseModal}
          ></div>
          <Frame className={classes.modalFrame} animate={true} corners={1}>
            <div
              style={{ padding: "1em", textAlign: "center", lineHeight: "2em" }}
            >
              <Words>
                Great job on completing your profile! You now have the
                opportunity to take 10 quizzes and 3 tests to enhance your
                skills. Each quiz takes around 5-10 minutes, while tests may
                take approximately 15-30 minutes. Click 'Confirm' to begin.
              </Words>
              <br />
              <br />
              <div>
                <Link to="/preworld/quiz">
                  <Button layer="success">Confirm</Button>
                </Link>
              </div>
            </div>
          </Frame>
        </>
      )}
    </>
  );
};

export default withStyles(styles)(CompleteProfileFrame);
