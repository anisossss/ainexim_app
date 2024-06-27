import React, { useState, useRef } from "react";
import { Frame, withStyles, Button, Header, Words } from "arwes";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/Auth/authSelectors";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const styles = (theme) => ({
  taskContainer: {},
  taskTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    padding: "10px",
  },
  taskDescription: {
    marginBottom: "10px",
  },
  statusIcon: {
    marginRight: "10px",
  },
  taskActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  menuContainer: {
    justifyContent: "space-between",
    display: "flex",
  },
  menuButton: {
    color: "#fff",
    margin: "5px 0",
  },
  bottom: {
    marginTop: "1em",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dots: {
    cursor: "pointer",
  },
});

const TimelineFrame = ({ classes }) => {
  const userData = useSelector(selectUser);
  const user = userData ? userData.user : null;
  const level = user ? user.level : null;

  const menuRef = useRef(null);
  const [openTask, setOpenTask] = useState(null);

  const staticTaskData = [
    {
      id: 1,
      title: "Task 1",
      description: "Complete the landing page",
      status: "completed",
      date: "2023-06-01",
    },
    {
      id: 2,
      title: "Task 2",
      description: "Implement login functionality",
      status: "pending",
      date: "2023-06-02",
    },
    {
      id: 3,
      title: "Task 3",
      description: "Set up database schema",
      status: "failed",
      date: "2023-06-03",
    },
    {
      id: 4,
      title: "Task 4",
      description: "Integrate payment gateway",
      status: "pending",
      date: "2023-06-04",
    },
    {
      id: 5,
      title: "Task 4",
      description: "Integrate payment gateway",
      status: "pending",
      date: "2023-06-04",
    },
    {
      id: 6,
      title: "Task 4",
      description: "Integrate payment gateway",
      status: "pending",
      date: "2023-06-04",
    },
    {
      id: 7,
      title: "Task 4",
      description: "Integrate payment gateway",
      status: "pending",
      date: "2023-06-04",
    },
    {
      id: 8,
      title: "Task 4",
      description: "Integrate payment gateway",
      status: "pending",
      date: "2023-06-04",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle className={classes.statusIcon} />;
      case "pending":
        return <FaExclamationCircle className={classes.statusIcon} />;
      case "failed":
        return <FaTimesCircle className={classes.statusIcon} />;
      default:
        return null;
    }
  };

  const handleOpenTask = (taskId) => {
    setOpenTask(openTask === taskId ? null : taskId);
  };

  const TaskActionsMenu = ({ taskId }) =>
    openTask === taskId ? (
      <div className={classes.menuContainer} ref={menuRef}>
        <Button layer="secondary" className={classes.menuButton}>
          Archive
        </Button>
        <Button layer="success" className={classes.menuButton}>
          Mark as done
        </Button>
      </div>
    ) : null;

  return (
    <Frame animate level={1} layer="primary">
      <VerticalTimeline>
        {staticTaskData.map((task) => (
          <VerticalTimelineElement
            key={task.id}
            contentStyle={{
              backgroundColor: "rgb(75,242,246, 0.1)",
              backdropFilter: "blur(10px) brightness(110%)",
              border: "none !important",
            }}
            contentArrowStyle={{ borderRight: "10px solid white" }}
            date={task.date}
            iconStyle={{ background: "#029DBB" }}
            icon={getStatusIcon(task.status)}
          >
            <div className={classes.taskContainer}>
              <Header className={classes.taskTitle}>
                <div>{task.title}</div>
                <div className={classes.bottom}>
                  <div className={classes.taskDescription}>
                    {task.description}
                  </div>
                  <div className={classes.taskActions}>
                    <HiOutlineDotsVertical
                      onClick={() => handleOpenTask(task.id)}
                      className={classes.dots}
                    />
                  </div>
                </div>
              </Header>
              <TaskActionsMenu taskId={task.id} />
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </Frame>
  );
};

export default withStyles(styles)(TimelineFrame);
