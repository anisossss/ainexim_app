import React from "react";
import { withStyles, Words } from "arwes";
import { Table } from "arwes";
import { Link } from "react-router-dom";
import { MdWork } from "react-icons/md";

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
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
  textArea: {
    border: "1px solid white",
    color: "#fff",
  },
});
const OpenJobsFrame = (props) => {
  const { classes, className } = props;
  const staticTasks = [
    {
      id: 1,
      title: "Frontend Developer",
      status: "Open",
    },
    {
      id: 2,
      title: "Backend Engineer",
      status: "Open",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      status: "Closed",
    },
    {
      id: 4,
      title: "Full Stack Developer",
      status: "Open",
    },
    {
      id: 5,
      title: "Software Engineer",
      status: "Closed",
    },
  ];
  return (
    <>
      <Words animate>Open Jobs on AINEXIM</Words>
      <br></br>
      <br></br>
      <Table className="table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Apply</th>
            </tr>
          </thead>
          <tbody>
            {staticTasks.map((rowData) => (
              <tr key={rowData.id}>
                <td>{rowData.id}</td>
                <td>{rowData.title}</td>
                <td>{rowData.status}</td>
                <td>
                  <Link to="/preworld/apply" title="Apply">
                    <MdWork size={30} style={{ marginRight: "5px" }} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>
    </>
  );
};

export default withStyles(styles)(OpenJobsFrame);
