import React, { useState, useRef, useEffect } from "react";
import { Frame, Table, withStyles, Button } from "arwes";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import axios from "axios";
import { selectUser } from "../../../../../redux/Auth/authSelectors";
import { useSelector } from "react-redux";
import { CONSTANTS } from "../../../../../constants/api";
const styles = (theme) => ({});

const BadgesFrame = (props) => {
  const userData = useSelector(selectUser);
  const user = userData ? userData.user : null;
  const level = user ? user.level : null;

  const menuRef = useRef(null);
  const [taskData, setTaskData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (level) {
          const response = await axios.get(
            `${CONSTANTS.API_URL}/generation/get-web-tasks?level=${level}`
          );
          setTaskData(response.data.tasks);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error getting task data from backend:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [level]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle color="green" />;
      case "pending":
        return <FaExclamationCircle color="orange" />;
      case "failed":
        return <FaTimesCircle color="red" />;
      default:
        return null;
    }
  };

  const [openTask, setOpenTask] = useState(null);

  const handleOpenTask = (taskId) => {
    if (openTask === taskId) {
      setOpenTask(null);
    } else {
      setOpenTask(taskId);
    }
  };

  const TaskActionsMenu = ({ taskId }) => {
    if (openTask === taskId) {
      return (
        <div className="toggle_menu_container" ref={menuRef}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Button className="menu_btn">
                <span className="menu_span">Mark as done</span>
              </Button>
            </li>
            <li>
              <Button className="menu_btn">
                <span className="menu_span">Archive</span>
              </Button>
            </li>
          </ul>
        </div>
      );
    }
    return null;
  };
  return (
    <Table className="table">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th> {/* Add a header for description */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taskData.map((rowData) => (
            <tr key={rowData.id}>
              <td>{rowData.title}</td>
              <td>{rowData.description}</td> {/* Display task description */}
              <td
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <HiOutlineDotsVertical />
                <TaskActionsMenu taskId={rowData.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Table>
  );
};

export default withStyles(styles)(BadgesFrame);
