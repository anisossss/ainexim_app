import React, { useState } from "react";
import { Frame, Button, Grid } from "arwes";
import { withStyles } from "arwes";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { completeProfile } from "../../../redux/Auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const styles = () => ({
  "@media (max-width: 800px)": {
    root: {
      margin: "0 12px",
    },
  },
  quizContainer: {
    padding: "20px",
    width: "100%",
    overflowY: "auto",
    margin: "auto",
    justifyContent: "center",
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
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
  modalFrame: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
    width: "50%",
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
  modalContent: {
    display: "flex",
    overflowX: "auto",
  },
  modalEntry: {
    width: "80vw",
    height: "100%",
  },
  step2: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  entryContainer: {
    marginBottom: "20px",
    background: "rgba(255, 255, 255, 0.2)",
    width: "90%",
    padding: "10px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
  proficiencyTabs: {
    display: "flex",
    marginBottom: "20px",
  },
  tab: {
    padding: "10px 20px",
    marginRight: "10px",
    cursor: "pointer",
    border: "none",
    background: "transparent",
    color: "#fff",
    outline: "none",
    borderBottom: "2px solid transparent",
    transition: "border-bottom-color 0.3s",
  },
  selectedTab: {
    borderBottomColor: "#00FF00",
  },
});

const CompleteProfileFrame = (props) => {
  const { classes, className } = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [currentEntries, setCurrentEntries] = useState([]);
  const [modalType, setModalType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    step1: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      phoneNumber: "",
      location: "",
      email: "",
      portfolioLink: "",
      linkedinLink: "",
      githubLink: "",
    },
    step2: {
      education: [],
      experience: [],
      languages: [],
      certifications: [],
    },
  });
  const handleRemoveEntry = (type, index) => {
    const updatedEntries = formData.step2[type].filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      step2: {
        ...prevData.step2,
        [type]: updatedEntries,
      },
    }));
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentEntries([]);
    setModalType("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const stepData = { ...formData[`step${step}`], [name]: value };
    setFormData((prevData) => ({ ...prevData, [`step${step}`]: stepData }));
  };

  const handleModalInputChange = (index, e, type) => {
    const { value } = e.target;
    const updatedEntry = { ...currentEntries[0], [type]: value };
    setCurrentEntries([updatedEntry]);
  };
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleLocationClick = () => {
    setLoadingLocation(true);

    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "denied") {
          toast.error(
            "Please enable location permissions in your browser settings and try again."
          );
          setLoadingLocation(false);
        } else {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              try {
                const response = await axios.get(
                  `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                );
                const { address } = response.data;
                const location = `${address.country}`;
                setFormData((prevData) => ({
                  ...prevData,
                  step1: {
                    ...prevData.step1,
                    location,
                  },
                }));
              } catch (error) {
                console.error("Error getting location data", error);
              }
              setLoadingLocation(false);
            },
            (error) => {
              console.error("Error getting location", error);
              setLoadingLocation(false);
            }
          );
        }
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoadingLocation(false);
    }
  };
  const handleAddEntry = (type) => {
    if (formData.step2[type].length >= 3) {
      console.log(`Maximum limit reached for ${type}`);
      return;
    }

    setModalType(type);
    setCurrentEntries([initializeCurrentEntry(type)]);
    setModalOpen(true);
  };

  const initializeCurrentEntry = (type) => {
    switch (type) {
      case "education":
        return {
          Degree: "",
          School: "",
          From: "",
          To: "",
          Location: "",
        };
      case "experience":
        return {
          Title: "",
          Location: "",
          From: "",
          To: "",
          Skills: "",
        };
      case "certifications":
        return {
          Name: "",
          Date: "",
          ExpirationDate: "",
        };
      case "languages":
        return {
          Language: "",
          Proficiency: "Basic",
        };
      default:
        return null;
    }
  };
  const handleUpdateEntry = (type, index) => {
    setModalType(type);
    setCurrentEntries([{ ...formData.step2[type][index], index }]);
    setModalOpen(true);
  };

  const handleSaveEntry = () => {
    const updatedEntries = [...formData.step2[modalType]];
    if (currentEntries[0].index !== undefined) {
      updatedEntries.splice(currentEntries[0].index, 1, currentEntries[0]);
    } else {
      updatedEntries.push(currentEntries[0]);
    }
    setFormData((prevData) => ({
      ...prevData,
      step2: {
        ...prevData.step2,
        [modalType]: updatedEntries,
      },
    }));
    setCurrentEntries([]);
    handleCloseModal();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileData = {
        phoneNumber: formData.step1.phoneNumber,
        location: formData.step1.location,
        portfolioLink: formData.step1.portfolioLink,
        linkedinLink: formData.step1.linkedinLink,
        githubLink: formData.step1.githubLink,
        education: formData.step2.education,
        experience: formData.step2.experience,
        languages: formData.step2.languages,
        certifications: formData.step2.certifications,
      };
      console.log(profileData);
      await dispatch(completeProfile(profileData)).unwrap();

      toast.success(
        "Your profile is successfully updated, redirecting to start assessments"
      );
      navigate("/preworld/quiz");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
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
              placeholder="Anis"
              name="firstName"
              id="firstName"
              className="full-width"
              value={formData.step1.firstName}
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
              value={formData.step1.lastName}
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
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              placeholder="Click to allow location access "
              name="location"
              id="location"
              className="full-width"
              value={
                loadingLocation
                  ? "Loading location..."
                  : formData.step1.location
              }
              onChange={handleInputChange}
              onClick={handleLocationClick}
              required
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="githubLink">Github (Optional)</label>
            <input
              type="text"
              placeholder="Enter your github username"
              name="githubLink"
              id="githubLink"
              className="full-width"
              value={formData.step1.githubLink}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="portfolioLink">Portfolio (Optional)</label>
            <input
              type="text"
              placeholder="Enter your portfolio link"
              name="portfolioLink"
              id="portfolioLink"
              className="full-width"
              value={formData.step1.portfolioLink}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="linkedinLink">Linkedin (Optional)</label>
            <input
              type="text"
              placeholder="Enter your Linkedin URL"
              name="linkedinLink"
              id="linkedinLink"
              className="full-width"
              value={formData.step1.linkedinLink}
              onChange={handleInputChange}
              required
            />
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div className={classes.step2}>
            <div className="form-group">
              <b htmlFor="education">Education</b>
              <br></br>
              <div>
                {formData.step2.education.map((edu, index) => (
                  <div key={index} className={classes.entryContainer}>
                    {Object.keys(edu).map((key) => (
                      <p key={key}>
                        <strong>{key}:</strong> {edu[key]}
                      </p>
                    ))}
                    <Button
                      onClick={() => handleUpdateEntry("education", index)}
                    >
                      Update
                    </Button>
                    &nbsp;
                    <Button
                      onClick={() => handleRemoveEntry("education", index)}
                      layer={"alert"}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() => handleAddEntry("education")}
                  disabled={formData.step2.education.length >= 3}
                >
                  Add Education
                </Button>
              </div>
            </div>
            <div className="form-group">
              <b htmlFor="experience">Experience</b>
              <br></br>
              <div>
                {formData.step2.experience.map((exp, index) => (
                  <div key={index} className={classes.entryContainer}>
                    {Object.keys(exp).map((key) => (
                      <p key={key}>
                        <strong>{key}:</strong> {exp[key]}
                      </p>
                    ))}
                    <Grid>
                      <Button
                        onClick={() => handleUpdateEntry("experience", index)}
                      >
                        Update
                      </Button>
                      &nbsp;
                      <Button
                        onClick={() => handleRemoveEntry("experience", index)}
                        layer={"alert"}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </div>
                ))}
                <Button
                  onClick={() => handleAddEntry("experience")}
                  disabled={formData.step2.experience.length >= 3}
                >
                  Add Experience
                </Button>
              </div>
            </div>
            <div className="form-group">
              <b htmlFor="certifications">Certifications</b>
              <br></br>
              <div>
                {formData.step2.certifications.map((cert, index) => (
                  <div key={index} className={classes.entryContainer}>
                    {Object.keys(cert).map((key) => (
                      <p key={key}>
                        <strong>{key}:</strong> {cert[key]}
                      </p>
                    ))}
                    <Button
                      onClick={() => handleUpdateEntry("certifications", index)}
                    >
                      Update
                    </Button>
                    &nbsp;
                    <Button
                      onClick={() => handleRemoveEntry("certifications", index)}
                      layer={"alert"}
                    >
                      Remove
                    </Button>
                  </div>
                ))}

                <Button
                  css
                  onClick={() => handleAddEntry("certifications")}
                  disabled={formData.step2.certifications.length >= 3}
                >
                  Add Certification
                </Button>
              </div>
            </div>
            <div className="form-group">
              <b htmlFor="languages">Languages</b>
              <br></br>
              <div>
                {formData.step2.languages.map((lang, index) => (
                  <div key={index} className={classes.entryContainer}>
                    <p>
                      <strong>Language:</strong> {lang.Language}
                    </p>
                    <p>
                      <strong>Proficiency:</strong> {lang.Proficiency}
                    </p>
                    <Button
                      onClick={() => handleUpdateEntry("languages", index)}
                    >
                      Update
                    </Button>
                    &nbsp;
                    <Button
                      onClick={() => handleRemoveEntry("languages", index)}
                      layer={"alert"}
                    >
                      Remove
                    </Button>
                  </div>
                ))}

                <Button
                  onClick={() => handleAddEntry("languages")}
                  disabled={formData.step2.languages.length >= 3}
                >
                  Add Language
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className={classes.submitButton}>
        <Button onClick={prevStep} layer={"secondary"} disabled={step === 1}>
          Previous
        </Button>
        {step === 1 && (
          <Button layer={"secondary"} onClick={nextStep}>
            Next
          </Button>
        )}

        {step === 2 && <Button onClick={handleSubmit}>Submit</Button>}
      </div>
      {isModalOpen && (
        <>
          <div className={classes.modalBackdrop}></div>
          <Frame
            animate
            level={3}
            corners={4}
            className={`${classes.modalFrame} ${className}`}
          >
            <div className={classes.quizContainer}>
              <IoClose
                size={20}
                onClick={handleCloseModal}
                style={{ cursor: "pointer", position: "absolute", right: 50 }}
              />
              <h2>{`Add ${
                modalType.charAt(0).toUpperCase() + modalType.slice(1)
              }`}</h2>
              <div className={classes.modalContent}>
                {modalType === "languages" ? (
                  <div className={classes.modalEntry}>
                    <div className="form-group">
                      <label htmlFor="languageName">Language</label>
                      <input
                        required
                        type="text"
                        name="languageName"
                        id="languageName"
                        className="full-width  "
                        value={currentEntries[0].Language}
                        onChange={(e) =>
                          handleModalInputChange(0, e, "Language")
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="languageProficiency">Proficiency</label>
                      <select
                        name="languageProficiency"
                        id="languageProficiency"
                        className="full-width  "
                        value={currentEntries[0].Proficiency}
                        onChange={(e) =>
                          handleModalInputChange(0, e, "Proficiency")
                        }
                      >
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className={classes.modalEntry}>
                    {Object.keys(initializeCurrentEntry(modalType)).map(
                      (key, index) => (
                        <div key={index} className="form-group">
                          <label htmlFor={key}>{key}</label>
                          <input
                            type="text"
                            required
                            name={key}
                            id={key}
                            className="full-width"
                            value={currentEntries[0][key]}
                            onChange={(e) => handleModalInputChange(0, e, key)}
                          />
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
              <div className={classes.buttonContainer}>
                <Button onClick={handleCloseModal}>Cancel</Button>
                <Button layer={"success"} onClick={handleSaveEntry}>
                  Save
                </Button>
              </div>
            </div>
          </Frame>
        </>
      )}
    </>
  );
};

export default withStyles(styles)(CompleteProfileFrame);
