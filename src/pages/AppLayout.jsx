import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { Frame, withSounds, withStyles } from "arwes";

import Centered from "../components/publicComp/Centered";
import Header from "../components/layout/index/Header";
import Footer from "../components/layout/index/Footer";
import NotFound from "../components/utils/NotFound";
// import ProtectedRoute from "./../routes/ProtectedRoute";

import Home from "./publicPages/Home";
import Sidebar from "../components/layout/index/Sidebar";
import Dashboard from "./dashboard/Dashboard";
import CurrentTasks from "./user/CurrentTasks";
import AchievementsTable from "./user/Achievements";

import Login from "./auth/Login";
import Notifications from "./dashboard/Notifications";
import Chat from "./dashboard/Chat";
import OpenJobs from "./dashboard/OpenJobs";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import ProfileSettings from "./user/ProfileSettings";
import Profile from "./user/Profile";

import Web from "./world/departments/Web";
import Admin from "./world/departments/Admin";
import Conference from "./world/departments/Conference";
import Training from "./world/departments/Training";
import Recreation from "./world/departments/Recreation";
import Progress from "./user/Progress";
import CompleteProfile from "./dashboard/CompleteProfile";

import Task from "./world/desktop/Task";
import Mission from "./world/desktop/Mission";
import Verification from "./world/desktop/Verification";

import Mentor from "./world/resources/Mentor";
import Techresources from "./world/resources/TechResources";
import BooksFrame from "../components/world/resources/techresources/books";
import CoursesFrame from "../components/world/resources/techresources/courses";
import PlaygroundsFrame from "../components/world/resources/techresources/playgrounds";
import CheatsheetsFrame from "../components/world/resources/techresources/cheatsheets";
import CastsFrame from "../components/world/resources/techresources/casts";

import Quiz from "./preworld/quiz/Quiz";
import QuizResult from "./preworld/quiz/QuizResult";
import Test from "./preworld/test/Test";
import TestResult from "./preworld/test/TestResult";
import Apply from "./preworld/jobs/Apply";
import TechResources from "./world/resources/TechResources";
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

  const onSuccessSound = () => sounds.success && sounds.success.play();
  const onAbortSound = () => sounds.abort && sounds.abort.play();
  const onFailureSound = () => sounds.warning && sounds.warning.play();
  const [active, setActive] = useState(true);
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
      } else if (pathname.startsWith("/world/conference-rooms")) {
        return resources.background.meeting_1;
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

  return (
    <div
      style={{
        minHeight: "100%",
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
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
              <Switch>
                <Route exact path="/">
                  <Login entered={anim.entered} />
                </Route>
                <Route exact path="/complete-profile">
                  <CompleteProfile entered={anim.entered} />
                </Route>
                <Route exact path="/dashboard">
                  <Dashboard entered={anim.entered} />
                </Route>
                <Route exact path="/login" component={Login} />
                <Route
                  exact
                  path="/forgot-password"
                  component={ForgotPassword}
                />
                <Route
                  exact
                  path="/reset-password/:token"
                  component={ResetPassword}
                />
                <Route exact path="/profile">
                  <Profile entered={anim.entered} />
                </Route>
                <Route exact path="/update-profile">
                  <Profile entered={anim.entered} />
                </Route>
                <Route exact path="/profile-settings">
                  <ProfileSettings entered={anim.entered} />
                </Route>
                <Route exact path="/progress">
                  <Progress entered={anim.entered} />
                </Route>
                <Route exact path="/current-tasks">
                  <CurrentTasks entered={anim.entered} />
                </Route>
                <Route exact path="/achievements">
                  <AchievementsTable entered={anim.entered} />
                </Route>
                <Route exact path="/chat">
                  <Chat entered={anim.entered} />
                </Route>
                <Route exact path="/notifications">
                  <Notifications entered={anim.entered} />
                </Route>

                <Route exact path="/open-jobs">
                  <OpenJobs entered={anim.entered} />
                </Route>

                {/* <Route
                  exact
                  path="/world/departments/training-center/tech-resources"
                >
                  <Techresources entered={anim.entered} />
                </Route> 
                when adding more than tech resources remove comment otherwise training center open the tech resources */}
                <Route
                  exact
                  path="/world/departments/training-center/tech-resources/books"
                >
                  <BooksFrame entered={anim.entered} />
                </Route>
                <Route
                  exact
                  path="/world/departments/training-center/tech-resources/casts"
                >
                  <CastsFrame entered={anim.entered} />
                </Route>
                <Route
                  exact
                  path="/world/departments/training-center/tech-resources/cheatsheets"
                >
                  <CheatsheetsFrame entered={anim.entered} />
                </Route>
                <Route
                  exact
                  path="/world/departments/training-center/tech-resources/playgrounds"
                >
                  <PlaygroundsFrame entered={anim.entered} />
                </Route>
                <Route
                  exact
                  path="/world/training-center/tech-resources/courses"
                >
                  <CoursesFrame entered={anim.entered} />
                </Route>
                <Route exact path="/world/mentor">
                  <Mentor entered={anim.entered} />
                </Route>

                <Route
                  exact
                  path="/world/departments/web-development-department"
                >
                  <Web entered={anim.entered} />
                </Route>
                <Route exact path="/world/departments/administration">
                  <Admin entered={anim.entered} />
                </Route>
                <Route exact path="/world/departments/conference-rooms">
                  <Conference entered={anim.entered} />
                </Route>
                <Route exact path="/world/departments/training-center">
                  <TechResources entered={anim.entered} />
                </Route>
                <Route exact path="/world/departments/recreation">
                  <Recreation entered={anim.entered} />
                </Route>
                <Route exact path="/world/desktop/task">
                  <Task entered={anim.entered} />
                </Route>
                <Route exact path="/world/desktop/mission">
                  <Mission entered={anim.entered} />
                </Route>
                <Route exact path="/world/desktop/task/verification">
                  <Verification entered={anim.entered} />
                </Route>

                <Route exact path="/preworld/test">
                  <Test entered={anim.entered} />
                </Route>

                <Route exact path="/preworld/test/result">
                  <TestResult entered={anim.entered} />
                </Route>

                <Route exact path="/preworld/quiz">
                  <Quiz entered={anim.entered} />
                </Route>

                <Route exact path="/preworld/quiz/result">
                  <QuizResult entered={anim.entered} />
                </Route>
                <Route exact path="/preworld/open-jobs">
                  <OpenJobs entered={anim.entered} />
                </Route>
                <Route exact path="/preworld/apply">
                  <Apply entered={anim.entered} />
                </Route>

                <Route component={NotFound} />
              </Switch>
            </div>
          )}
        </Frame>
      </Centered>
      {/* <Footer /> */}
    </div>
  );
};

export default withSounds()(withStyles(styles)(AppLayout));
