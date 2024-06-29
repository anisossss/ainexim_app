import React, { useEffect, useState } from "react";
import { withStyles, Words, Button, Frame } from "arwes";
import { Table } from "arwes";
import { Link } from "react-router-dom";
import { MdWork } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setSelectedJob } from "../../../redux/Job/jobSlice";
import axios from "axios";
import { CONSTANTS } from "../../../constants/api";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/Auth/authSelectors";
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
    height: "72%",
  },
  buttonContainer: {
    display: "flex",
    width: "20%",
    justifyContent: "space-evenly",
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
    marginTop: "5px",
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
    background: "rgba(0, 0, 0, 0.8)",
    zIndex: 999,
  },
  textArea: {
    border: "1px solid white",
    color: "#fff",
  },
});
const OpenJobsFrame = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get(
        `${CONSTANTS.API_URL}/generation/get-web-programs`
      );
      const data = response.data;
      if (data.success) {
        setPrograms(data.programs);
      } else {
        console.error("Failed to fetch programs:", data.message);
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  const handleJobSelect = (jobTitle) => {
    dispatch(setSelectedJob(jobTitle));
  };

  const handleDetailsClick = (program) => {
    setSelectedProgram(program);
  };

  const handleCloseDetails = () => {
    setSelectedProgram(null);
  };
  return (
    <>
      <Words animate>Web Programs on AINEXIM</Words>
      <br />
      <br />
      <Table>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Level</th>
              <th>Career</th>
              <th>Enrolled Users</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program) => (
              <tr key={program._id}>
                <td>{program.name}</td>
                <td>{program.level}</td>
                <td>{program.career}</td>
                <td>{program.enrolledUsers.length}</td>
                <td>
                  <Link
                    to={`/preworld/apply/${program._id}`}
                    onClick={() => handleJobSelect(program.career)}
                  >
                    <Button layer="success">Apply</Button>
                  </Link>
                  &nbsp;
                  <Button onClick={() => handleDetailsClick(program)}>
                    See More Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>

      {selectedProgram && (
        <Frame level={3} className={classes.modalBackdrop}>
          <div className={classes.modalFrame}>
            <h2>{selectedProgram.name}</h2>
            <Words animate>{selectedProgram.description}</Words>
            <br></br>
            <br></br>
            <Button onClick={handleCloseDetails}>Close</Button>
          </div>
        </Frame>
      )}
    </>
  );
};

export default withStyles(styles)(OpenJobsFrame);
