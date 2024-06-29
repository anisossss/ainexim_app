import React, { useState, useEffect } from "react";
import { Table, withStyles } from "arwes";

import axios from "axios";
import { selectUser } from "../../redux/Auth/authSelectors";
import { useSelector } from "react-redux";
import { CONSTANTS } from "../../constants/api";
import { toast } from "react-toastify";

const styles = (theme) => ({});
const CurrentTasksTable = (props) => {
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
    } catch (error) {
      console.error(
        "Error fetching web problem solving test assignments:",
        error
      );
      toast.error("Error fetching web problem solving test assignments");
    }
  };

  return (
    <Table className="dashboard_card">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {webTaskAssignments.map((assignment) => (
            <tr key={assignment.webTask._id}>
              <td>{assignment.webTask.title}</td>
              <td>{assignment.progress}</td>
            </tr>
          ))}

          {webMeetingAssignments.map((assignment) => (
            <tr key={assignment.webMeeting._id}>
              <td>{assignment.webMeeting.title}</td>
              <td>{assignment.progress}</td>
            </tr>
          ))}

          {webQuizAssignments.map((assignment) => (
            <tr key={assignment.webQuiz._id}>
              <td>{assignment.webQuiz.title}</td>
              <td>{assignment.progress}</td>
            </tr>
          ))}

          {webProblemSolvingTestAssignments.map((assignment) => (
            <tr key={assignment.webProblemSolvingTest._id}>
              <td>{assignment.webProblemSolvingTest.title}</td>
              <td>{assignment.progress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Table>
  );
};

export default withStyles(styles)(CurrentTasksTable);
