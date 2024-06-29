import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Frame, withSounds, withStyles } from "arwes";
import PrivateRoute from "../components/Routes/PrivateRoute";
import PublicRoute from "../components/Routes/PublicRoute";
import Centered from "../components/publicComp/Centered";
import Header from "../components/layout/index/Header";
import NotFound from "../components/utils/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/layout/index/Sidebar";
import Dashboard from "./world/dashboard/Dashboard";
import CurrentTasks from "./user/CurrentTasks";

import Login from "./auth/Login";
import Notifications from "./world/dashboard/Notifications";
import Chat from "./world/chat";
import OpenJobs from "./preworld/careers/OpenJobs";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import ProfileSettings from "./user/ProfileSettings";
import Profile from "./user/Profile";

import Admin from "./world/departments/administration";
import Meeting from "./world/departments/meeting/Meeting";
import MeetingEvaluation from "./world/departments/meeting/MeetingEvaluation";

import Timeline from "./world/progress/timeline";
import Recreation from "./world/departments/recreation";
import CompleteProfile from "./preworld/complete/CompleteProfile";
import MyDesktop from "./world/desktop/MyDesktop";

import CodeTask from "./world/desktop/tasks/dev/CodeTask";
import Verification from "./world/desktop/tasks/dev/Verification";
import GithubTask from "./world/desktop/tasks/github/GithubTask";

import WebQuiz from "./world/desktop/tasks/webquiz/WebQuiz";
import WebQuizResult from "./world/desktop/tasks/webquiz/WebQuizResult";
import ProblemSolvingTest from "./world/desktop/tasks/problemsolving/ProblemSolvingTest";
import ProblemSolvingTestResult from "./world/desktop/tasks/problemsolving/ProblemSolvingTestResult";

import Mentor from "./world/mentor";
import TechResources from "./world/resources";

import BooksFrame from "../components/world/web/techresources/books";
import CoursesFrame from "../components/world/web/techresources/casts";
import PlaygroundsFrame from "../components/world/web/techresources/playgrounds";
import CheatsheetsFrame from "../components/world/web/techresources/cheatsheets";
import CastsFrame from "../components/world/web/techresources/courses";
import ProblemSetsFrame from "../components/world/web/techresources/problemsets";
import TutosFrame from "../components/world/web/techresources/tutos";

import Quiz from "./preworld/quiz/SoftwareQuiz";
import QuizResult from "./preworld/quiz/SoftwareQuizResult";
import Test from "./preworld/test/Test";
import TestResult from "./preworld/test/TestResult";
import Apply from "./preworld/careers/Apply";
import { Flip } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { refresh } from "../redux/Auth/authOperations";
import {
  selectIsRefreshing,
  selectToken,
  selectUser,
} from "../redux/Auth/authSelectors";
const styles = () => ({
  centered: {
    flex: 1,
    paddingBottom: "10px",
    marginTop: "1.6em",
  },
});
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    console.log("Tab is inactive now");
  } else {
    console.log("Tab is active again");
  }
});
const AppLayout = (props) => {
  const { sounds, classes, resources } = props;
  const [frameVisible, setFrameVisible] = useState(true);
  const location = useLocation();
  const [background, setBackground] = useState("");
  const animateFrame = () => {
    setFrameVisible(false);
    setTimeout(() => {
      setFrameVisible(true);
    }, 600);
  };

  const user = useSelector(selectUser);

  // const onSuccessSound = () => sounds.success && sounds.success.play()
  // const onAbortSound = () => sounds.abort && sounds.abort.play()
  // const onFailureSound = () => sounds.warning && sounds.warning.play()
  // const [active, setActive] = useState(true)
  useEffect(() => {
    const getBackground = () => {
      const { pathname } = location;

      if (pathname.startsWith("/world/desktop")) {
        return resources.background.desktop;
      } else if (pathname.startsWith("/world/departments/recreation")) {
        return resources.background.recreation;
      } else if (pathname.startsWith("/world/departments/training-center")) {
        return resources.background.training_center;
      } else if (pathname.startsWith("/world/departments")) {
        return resources.background.cto_office;
      } else if (pathname.startsWith("/world/mentor")) {
        return resources.background.hr_office;
      } else if (pathname.startsWith("/world/side_view_office")) {
        return resources.background.side_view_office;
      } else if (pathname.startsWith("/world/front_view_office")) {
        return resources.background.front_view_office;
      } else if (pathname.startsWith("/world/meeting_1")) {
        return resources.background.meeting_1;
      } else if (pathname.startsWith("/world/meeting_2")) {
        return resources.background.meeting_2;
      } else if (pathname.startsWith("/world/meeting_3")) {
        return resources.background.meeting_3;
      } else {
        return resources.background.coworking_space;
      }
    };
    setBackground(getBackground());
  }, [location, resources.background]);
  const dispatch = useDispatch();
  const isRefreshUser = useSelector(selectIsRefreshing);

  const token = useSelector(selectToken);

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch(refresh()).then((res) => {
      if (!res.error) {
        console.log(res);
      }
    });
  }, [dispatch, token]);
  return isRefreshUser ? (
    <div className="loadingio">
      <div className="loading">
        <div></div>
      </div>
    </div>
  ) : (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100%",
      }}
    >
      <Header onNav={animateFrame} />
      <Sidebar />
      <Centered className={classes.centered}>
        <Frame
          animate
          show={frameVisible}
          corners={4}
          style={{
            visibility: frameVisible ? "visible" : "hidden",
          }}
        >
          {(anim) => (
            <div style={{ padding: "20px" }}>
              <Routes>
                <Route
                  path="/"
                  element={<PrivateRoute component={Dashboard} />}
                />
                <Route
                  path="/login"
                  element={<PublicRoute component={Login} />}
                />
                <Route
                  path="/forgot-password"
                  element={<PrivateRoute component={ForgotPassword} />}
                />
                <Route
                  path="/reset-password"
                  element={<PrivateRoute component={ResetPassword} />}
                />
                <Route
                  path="/preworld/complete-profile"
                  element={
                    user?.user?.profileCompleted ? (
                      <Navigate to="/dashboard" />
                    ) : (
                      <PrivateRoute component={CompleteProfile} />
                    )
                  }
                />
                <Route
                  path="/dashboard"
                  element={<PrivateRoute component={Dashboard} />}
                />
                <Route
                  path="/profile"
                  element={<PrivateRoute component={Profile} />}
                />
                <Route
                  path="/profile-settings"
                  element={<PrivateRoute component={ProfileSettings} />}
                />
                <Route
                  path="/current-tasks"
                  element={<PrivateRoute component={CurrentTasks} />}
                />
                <Route
                  path="/world/current-mission-timeline"
                  element={<PrivateRoute component={Timeline} />}
                />

                <Route
                  path="/chat"
                  element={<PrivateRoute component={Chat} />}
                />
                <Route
                  path="/notifications"
                  element={<PrivateRoute component={Notifications} />}
                />

                <Route
                  path="/world/departments/training-center/tech-resources/books"
                  element={<PrivateRoute component={BooksFrame} />}
                />
                <Route
                  path="/world/departments/training-center/tech-resources/casts"
                  element={<PrivateRoute component={CastsFrame} />}
                />
                <Route
                  path="/world/departments/training-center/tech-resources/cheatsheets"
                  element={<PrivateRoute component={CheatsheetsFrame} />}
                />
                <Route
                  path="/world/departments/training-center/tech-resources/playgrounds"
                  element={<PrivateRoute component={PlaygroundsFrame} />}
                />
                <Route
                  path="/world/departments/training-center/tech-resources/courses"
                  element={<PrivateRoute component={CoursesFrame} />}
                />
                <Route
                  path="/world/departments/training-center/tech-resources/problem-sets"
                  element={<PrivateRoute component={ProblemSetsFrame} />}
                />
                <Route
                  path="/world/departments/training-center/tech-resources/interactive-tutorials"
                  element={<PrivateRoute component={TutosFrame} />}
                />

                <Route
                  path="/world/mentor"
                  element={<PrivateRoute component={Mentor} />}
                />

                <Route
                  path="/world/departments/administration"
                  element={<PrivateRoute component={Admin} />}
                />
                <Route
                  path="/world/departments/meeting-room/:webMeetingId"
                  element={<PrivateRoute component={Meeting} />}
                />
                <Route
                  path="/world/departments/meeting-evaluation/:meetingEvaluationId/:userId"
                  element={<PrivateRoute component={MeetingEvaluation} />}
                />
                <Route
                  path="/world/departments/training-center"
                  element={<PrivateRoute component={TechResources} />}
                />
                <Route
                  path="/world/departments/recreation"
                  element={<PrivateRoute component={Recreation} />}
                />
                <Route
                  path="/world/desktop/my-dock/:webTaskId"
                  element={<PrivateRoute component={MyDesktop} />}
                />
                <Route
                  path="/world/desktop/web-quiz/:webQuizId"
                  element={<PrivateRoute component={WebQuiz} />}
                />
                <Route
                  path="/world/desktop/web-quiz/verification/:webQuizEvaluationId"
                  element={<PrivateRoute component={WebQuizResult} />}
                />
                <Route
                  path="/world/desktop/problem-solving-test/:webProblemSolvingTestId"
                  element={<PrivateRoute component={ProblemSolvingTest} />}
                />
                <Route
                  path="/world/desktop/problem-solving-test/verification/:webProblemSolvingTestEvaluationId"
                  element={
                    <PrivateRoute component={ProblemSolvingTestResult} />
                  }
                />
                <Route
                  path="/world/desktop/code-task/:webTaskId"
                  element={<PrivateRoute component={CodeTask} />}
                />
                <Route
                  path="/world/desktop/task/verification/:webTaskEvaluationId"
                  element={<PrivateRoute component={Verification} />}
                />
                <Route
                  path="/world/desktop/github-task"
                  element={<PrivateRoute component={GithubTask} />}
                />

                <Route
                  path="/preworld/test"
                  element={<PrivateRoute component={Test} />}
                />
                <Route
                  path="/preworld/test/result"
                  element={<PrivateRoute component={TestResult} />}
                />
                <Route
                  path="/preworld/quiz"
                  element={<PrivateRoute component={Quiz} />}
                />
                <Route
                  path="/preworld/quiz/result"
                  element={<PrivateRoute component={QuizResult} />}
                />
                <Route
                  path="/preworld/web-programs"
                  element={<PrivateRoute component={OpenJobs} />}
                />
                <Route
                  path="/preworld/apply/:programId"
                  element={<PrivateRoute component={Apply} />}
                />
                <Route element={<NotFound />} />
              </Routes>
            </div>
          )}
        </Frame>
      </Centered>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />{" "}
    </div>
  );
};

export default withSounds()(withStyles(styles)(AppLayout));
