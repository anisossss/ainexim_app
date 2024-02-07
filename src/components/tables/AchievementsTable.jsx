import React, { useState, useRef, useEffect } from "react";
import { Table, withStyles, Button } from "arwes";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";

const styles = (theme) => ({});

const AchievementTable = (props) => {
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenTask(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const staticTasks = [
    {
      id: 1,
      title: "Captivating homepage layout created",
      status: "completed",
    },
    {
      id: 2,
      title: "Robust user authentication implemented",
      status: "completed",
    },
    { id: 3, title: "Website performance optimized", status: "completed" },
    { id: 4, title: "Mobile-responsive layout designed", status: "completed" },
    {
      id: 5,
      title: "Cross-browser compatibility issues addressed",
      status: "completed",
    },
    {
      id: 6,
      title: "Cross-browser compatibility issues fixed",
      status: "completed",
    },
    { id: 7, title: "Mobile-responsive design deployed", status: "completed" },
    {
      id: 8,
      title: "Comprehensive testing protocols implemented",
      status: "completed",
    },
    {
      id: 9,
      title: "Development process documented and shared",
      status: "completed",
    },
    {
      id: 10,
      title: "Website accessibility features enhanced",
      status: "completed",
    },
  ];

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
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {staticTasks.map((rowData) => (
            <tr key={rowData.id}>
              <td>{rowData.id}</td>
              <td>{rowData.title}</td>
              <td style={{}}>{getStatusIcon(rowData.status)}</td>
              <td
                style={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <HiOutlineDotsVertical
                  onClick={() => handleOpenTask(rowData.id)}
                />
                <TaskActionsMenu taskId={rowData.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Table>
  );
};

export default withStyles(styles)(AchievementTable);
