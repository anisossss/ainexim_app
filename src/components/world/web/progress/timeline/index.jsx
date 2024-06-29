import React, { useState, useEffect } from "react";
import { Frame, withStyles, Button, Header } from "arwes";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import axios from "axios";
import { toast } from "react-toastify";
import { CONSTANTS } from "../../../../../constants/api";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../redux/Auth/authSelectors";
import { Tooltip } from "react-tooltip";
import moment from "moment";
import { Link } from "react-router-dom";
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
    cursor: "pointer",
  },
  taskActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  menuContainer: {
    justifyContent: "space-between",
    width: "100%",
    display: "flex",
  },
  menuButton: {
    color: "#fff",
    textDecoration: "none",
  },
  bottom: {
    marginTop: "1em",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  dots: {
    cursor: "pointer",
  },
  disabledElement: {
    // opacity: 0.5,
    // pointerEvents: "none",
  },
});

const TimelineFrame = ({ classes }) => {
  const [webTaskAssignments, setWebTaskAssignments] = useState([]);
  const [webMeetingAssignments, setWebMeetingAssignments] = useState([]);
  const [webQuizAssignments, setWebQuizAssignments] = useState([]);
  const [
    webProblemSolvingTestAssignments,
    setWebProblemSolvingTestAssignments,
  ] = useState([]);
  const userData = useSelector(selectUser);
  const user = userData ? userData.user : null;
  const userId = user ? user._id : null;
  const formatTime = (time) => {
    const now = moment();
    const messageTime = moment(time);
    if (now.isSame(messageTime, "day")) {
      return messageTime.format("HH:mm");
    } else {
      return messageTime.format("D/M/Y");
    }
  };
  useEffect(() => {
    if (userId) {
      fetchWebTasks();
      fetchWebMeetingAssignments();
      fetchWebQuizAssignments();
      fetchWebProblemSolvingTestAssignments();
    }
  }, [userId]);

  const fetchWebTasks = async () => {
    try {
      const response = await axios.get(
        `${CONSTANTS.API_URL}/generation/get-web-dev-assignments?userId=${userId}`
      );
      setWebTaskAssignments(response.data.assignments);
      console.log(response.data.assignments);
    } catch (error) {
      console.error("Error fetching web tasks:", error);
      toast.error("Error fetching web tasks");
    }
  };

  const fetchWebMeetingAssignments = async () => {
    try {
      const response = await axios.get(
        `${CONSTANTS.API_URL}/generation/get-web-meeting-assignments?userId=${userId}`
      );
      setWebMeetingAssignments(response.data.assignments);
      console.log(response.data.assignments);
    } catch (error) {
      console.error("Error fetching web meeting assignments:", error);
      toast.error("Error fetching web meeting assignments");
    }
  };

  const fetchWebQuizAssignments = async () => {
    try {
      const response = await axios.get(
        `${CONSTANTS.API_URL}/generation/get-web-quiz-assignments?userId=${userId}`
      );
      setWebQuizAssignments(response.data.assignments);
      console.log(response.data.assignments);
    } catch (error) {
      console.error("Error fetching web quiz assignments:", error);
      toast.error("Error fetching web quiz assignments");
    }
  };

  const fetchWebProblemSolvingTestAssignments = async () => {
    try {
      const response = await axios.get(
        `${CONSTANTS.API_URL}/generation/get-web-problem-solving-tests-assignments?userId=${userId}`
      );
      setWebProblemSolvingTestAssignments(response.data.assignments);
      console.log(response.data.assignments);
    } catch (error) {
      console.error(
        "Error fetching web problem solving test assignments:",
        error
      );
      toast.error("Error fetching web problem solving test assignments");
    }
  };
  const getStatusIcon = (status, classes) => {
    switch (status) {
      case "Done":
        return (
          <FaCheckCircle
            className={classes.statusIcon}
            data-tooltip-id="tooltip-done"
            style={{ color: "#4CAF50" }}
          />
        );
      case "Not Started":
        return (
          <FaExclamationCircle
            data-tooltip-id="tooltip-pending"
            className={classes.statusIcon}
            style={{ color: "#FFC107" }}
          />
        );
      case "On Progress":
        return (
          <FaTimesCircle
            className={classes.statusIcon}
            data-tooltip-id="tooltip-onprogress"
            style={{ color: "#FF5722" }}
          />
        );
      default:
        return null;
    }
  };

  const TaskActionsMenu = ({
    taskId,
    webMeetingId,
    webQuizId,
    webProblemSolvingTestId,
    progress,
  }) => (
    <div className={classes.menuContainer}>
      <Button layer="secondary" className={classes.menuButton}>
        Archive
      </Button>
      <Button layer="success" className={classes.menuButton}>
        Mark as done
      </Button>
      {taskId && (
        <Link to={`/world/desktop/my-dock/${taskId}`}>
          <Button layer="primary" className={classes.menuButton}>
            Task Details
          </Button>
        </Link>
      )}
      {webMeetingId && (
        <Link to={`/world/departments/meeting-room/${webMeetingId}`}>
          <Button layer="primary" className={classes.menuButton}>
            Meeting Details
          </Button>
        </Link>
      )}
      {webQuizId && (
        <Link to={`/world/desktop/web-quiz/${webQuizId}`}>
          <Button
            layer="primary"
            className={classes.menuButton}
            disabled={progress === "Done"}
          >
            Quiz Details
          </Button>
        </Link>
      )}
      {webProblemSolvingTestId && (
        <Link
          to={`/world/desktop/problem-solving-test/${webProblemSolvingTestId}`}
        >
          <Button layer="primary" className={classes.menuButton}>
            Test Details
          </Button>
        </Link>
      )}
    </div>
  );

  const handleOpenTaskDetails = async (taskId) => {
    // Implement your logic for opening task details here
  };

  return (
    <>
      <Frame animate level={1} layer="primary">
        {/* Web Tasks Timeline */}
        <VerticalTimeline>
          {webTaskAssignments.map((task) => (
            <VerticalTimelineElement
              key={task._id}
              contentStyle={{
                backgroundColor: "rgb(75,242,246, 0.1)",
                backdropFilter: "blur(10px) brightness(110%)",
              }}
              contentArrowStyle={{ borderRight: "10px solid white" }}
              date={formatTime(task.createdAt)}
              icon={getStatusIcon(task.progress, classes)}
              iconStyle={{ background: "#029DBB" }}
            >
              <div
                className={
                  task.progress === "Done" ? classes.disabledElement : ""
                }
              >
                <Header className={classes.taskTitle}>
                  <div>{task.webTask.title}</div>
                  <div className={classes.bottom}>
                    <div className={classes.taskActions}>
                      <HiOutlineDotsVertical
                        onClick={() => handleOpenTaskDetails(task._id)}
                        className={classes.dots}
                      />
                    </div>
                  </div>
                </Header>
                <TaskActionsMenu taskId={task._id} progress={task.progress} />
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>

        {/* Web Tasks Timeline */}
        <VerticalTimeline>
          {webMeetingAssignments.map((webMeeting) => (
            <VerticalTimelineElement
              key={webMeeting._id}
              contentStyle={{
                backgroundColor: "rgb(75,242,246, 0.1)",
                backdropFilter: "blur(10px) brightness(110%)",
                padding: 10,
              }}
              contentArrowStyle={{ borderRight: "10px solid white" }}
              date={formatTime(webMeeting.createdAt)}
              icon={getStatusIcon(webMeeting.progress, classes)}
              iconStyle={{ background: "#029DBB" }}
            >
              <div
                className={
                  webMeeting.progress === "Done" ? classes.disabledElement : ""
                }
              >
                <Header className={classes.taskTitle}>
                  <div>{webMeeting.webMeeting.title}</div>
                  <div className={classes.bottom}>
                    <div className={classes.taskActions}>
                      <HiOutlineDotsVertical
                        onClick={() => handleOpenTaskDetails(webMeeting._id)}
                        className={classes.dots}
                      />
                    </div>
                  </div>
                </Header>
                <TaskActionsMenu webMeetingId={webMeeting._id} />
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
        {/* Web Tasks Timeline */}
        <VerticalTimeline>
          {webQuizAssignments.map((webQuiz) => (
            <VerticalTimelineElement
              key={webQuiz._id}
              contentStyle={{
                backgroundColor: "rgb(75,242,246, 0.1)",
                backdropFilter: "blur(10px) brightness(110%)",
              }}
              contentArrowStyle={{ borderRight: "10px solid white" }}
              date={formatTime(webQuiz.createdAt)}
              icon={getStatusIcon(webQuiz.progress, classes)}
              iconStyle={{ background: "#029DBB" }}
            >
              <div
                className={
                  webQuiz.progress === "Done" ? classes.disabledElement : ""
                }
              >
                <Header className={classes.taskTitle}>
                  <div>{webQuiz.webQuiz.title}</div>
                  <div className={classes.bottom}>
                    <div className={classes.taskActions}>
                      <HiOutlineDotsVertical
                        onClick={() => handleOpenTaskDetails(webQuiz._id)}
                        className={classes.dots}
                      />
                    </div>
                  </div>
                </Header>
                <TaskActionsMenu webQuizId={webQuiz._id} />
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
        {/* Web Tasks Timeline */}
        <VerticalTimeline>
          {webProblemSolvingTestAssignments.map((webProblemSolvingTest) => (
            <VerticalTimelineElement
              key={webProblemSolvingTest._id}
              contentStyle={{
                backgroundColor: "rgb(75,242,246, 0.1)",
                backdropFilter: "blur(10px) brightness(110%)",
              }}
              contentArrowStyle={{ borderRight: "10px solid white" }}
              date={formatTime(webProblemSolvingTest.createdAt)}
              icon={getStatusIcon(webProblemSolvingTest.progress, classes)}
              iconStyle={{ background: "#029DBB" }}
            >
              <div
                className={
                  webProblemSolvingTest.progress === "Done"
                    ? classes.disabledElement
                    : ""
                }
              >
                <Header className={classes.taskTitle}>
                  <div>{webProblemSolvingTest.webProblemSolvingTest.title}</div>
                  <div className={classes.bottom}>
                    <div className={classes.taskActions}>
                      <HiOutlineDotsVertical
                        onClick={() =>
                          handleOpenTaskDetails(webProblemSolvingTest._id)
                        }
                        className={classes.dots}
                      />
                    </div>
                  </div>
                </Header>
                <TaskActionsMenu
                  webProblemSolvingTestId={webProblemSolvingTest._id}
                />
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
        <Tooltip
          id="tooltip-done"
          place="top"
          variant="success"
          content="Done"
        />
        <Tooltip
          id="tooltip-pending"
          place="top"
          variant="warning"
          content="Not Started"
        />
        <Tooltip
          id="tooltip-onprogress"
          place="top"
          variant="info"
          content="On Progress"
        />
      </Frame>
    </>
  );
};

export default withStyles(styles)(TimelineFrame);
