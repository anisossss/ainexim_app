import React from "react";
import { Frame, Table, withStyles, Button } from "arwes";
import { FaCheckCircle } from "react-icons/fa"; // Importing the apply icon from Font Awesome
import { Link } from "react-router-dom";
const styles = (theme) => ({});

const OpenJobsTable = (props) => {
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
    <Table className="table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Action</th>
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
                  <FaCheckCircle style={{ marginRight: "5px" }} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Table>
  );
};

export default withStyles(styles)(OpenJobsTable);
