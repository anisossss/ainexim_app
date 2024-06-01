import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { Frame, withSounds, withStyles } from 'arwes'
import PrivateRoute from '../components/Routes/PrivateRoute'
import PublicRoute from '../components/Routes/PublicRoute'
import Centered from '../components/publicComp/Centered'
import Header from '../components/layout/index/Header'
import NotFound from '../components/utils/NotFound'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Sidebar from '../components/layout/index/Sidebar'
import Dashboard from './dashboard/Dashboard'
import CurrentTasks from './user/CurrentTasks'
import AchievementsTable from './user/Achievements'

import Login from './auth/Login'
import Notifications from './dashboard/Notifications'
import Chat from './world/desktop/Chat'
import OpenJobs from './preworld/jobs/OpenJobs'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import ProfileSettings from './user/ProfileSettings'
import Profile from './user/Profile'

import Web from './world/departments/Web'
import Admin from './world/departments/Admin'
import Meeting from './world/departments/Meeting'
import MeetingEvaluation from './world/departments/MeetingEvaluation'

import Training from './world/departments/Training'
import Timeline from './world/desktop/Timeline'
import Recreation from './world/departments/Recreation'
import CompleteProfile from './preworld/complete/CompleteProfile'
import MyDesktop from './world/desktop/MyDesktop'
import CodeTask from './world/desktop/CodeTask'
import GithubTask from './world/desktop/GithubTask'
import GithubActivityTask from './world/desktop/GithubActivityTask'
import Verification from './world/desktop/Verification'

import Mentor from './world/resources/Mentor'
import TechResources from './world/resources/TechResources'

import BooksFrame from '../components/world/resources/techresources/books'
import CoursesFrame from '../components/world/resources/techresources/casts'
import PlaygroundsFrame from '../components/world/resources/techresources/playgrounds'
import CheatsheetsFrame from '../components/world/resources/techresources/cheatsheets'
import CastsFrame from '../components/world/resources/techresources/courses'
import ProblemSetsFrame from '../components/world/resources/techresources/problemsets'
import TutosFrame from '../components/world/resources/techresources/tutos'

import Quiz from './preworld/quiz/Quiz'
import QuizResult from './preworld/quiz/QuizResult'
import Test from './preworld/test/Test'
import TestResult from './preworld/test/TestResult'
import Apply from './preworld/jobs/Apply'
import { Flip } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux'
import { refresh } from '../redux/Auth/authOperations'
import { selectIsRefreshing, selectToken, selectUser } from '../redux/Auth/authSelectors'
const styles = () => ({
  centered: {
    flex: 1,
    paddingBottom: '10px',
    marginTop: '1.6em',
  },
})
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    console.log('Tab is inactive now')
  } else {
    console.log('Tab is active again')
  }
})
const AppLayout = (props) => {
  const { sounds, classes, resources } = props
  const [frameVisible, setFrameVisible] = useState(true)
  const location = useLocation()
  const [background, setBackground] = useState('')
  const animateFrame = () => {
    setFrameVisible(false)
    setTimeout(() => {
      setFrameVisible(true)
    }, 600)
  }

  const user = useSelector(selectUser)

  // const onSuccessSound = () => sounds.success && sounds.success.play()
  // const onAbortSound = () => sounds.abort && sounds.abort.play()
  // const onFailureSound = () => sounds.warning && sounds.warning.play()
  // const [active, setActive] = useState(true)
  useEffect(() => {
    const getBackground = () => {
      const { pathname } = location

      if (pathname.startsWith('/world/desktop')) {
        return resources.background.desktop
      } else if (pathname.startsWith('/world/departments/recreation')) {
        return resources.background.recreation
      } else if (pathname.startsWith('/world/departments/training-center')) {
        return resources.background.training_center
      } else if (pathname.startsWith('/world/departments')) {
        return resources.background.cto_office
      } else if (pathname.startsWith('/world/mentor')) {
        return resources.background.hr_office
      } else if (pathname.startsWith('/world/side_view_office')) {
        return resources.background.side_view_office
      } else if (pathname.startsWith('/world/front_view_office')) {
        return resources.background.front_view_office
      } else if (pathname.startsWith('/world/meeting_1')) {
        return resources.background.meeting_1
      } else if (pathname.startsWith('/world/meeting_2')) {
        return resources.background.meeting_2
      } else if (pathname.startsWith('/world/meeting_3')) {
        return resources.background.meeting_3
      } else {
        return resources.background.coworking_space
      }
    }
    setBackground(getBackground())
  }, [location, resources.background])
  const dispatch = useDispatch()
  const isRefreshUser = useSelector(selectIsRefreshing)

  const token = useSelector(selectToken)

  useEffect(() => {
    if (!token) {
      return
    }
    dispatch(refresh()).then((res) => {
      if (!res.error) {
        console.log(res)
      }
    })
  }, [dispatch, token])
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
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        minHeight: '100%',
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
            visibility: frameVisible ? 'visible' : 'hidden',
          }}
        >
          {(anim) => (
            <div style={{ padding: '20px' }}>
              <Routes>
                <Route path="/" element={<PrivateRoute component={Dashboard} />} />
                <Route path="/login" element={<PublicRoute component={Login} />} />
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
                <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
                <Route path="/profile" element={<PrivateRoute component={Profile} />} />
                <Route
                  path="/profile-settings"
                  element={<PrivateRoute component={ProfileSettings} />}
                />
                <Route path="/current-tasks" element={<PrivateRoute component={CurrentTasks} />} />
                <Route
                  path="/world/desktop/tasks-timeline"
                  element={<PrivateRoute component={Timeline} />}
                />
                <Route
                  path="/achievements"
                  element={<PrivateRoute component={AchievementsTable} />}
                />
                <Route path="/chat" element={<PrivateRoute component={Chat} />} />
                <Route path="/notifications" element={<PrivateRoute component={Notifications} />} />

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

                <Route path="/world/mentor" element={<PrivateRoute component={Mentor} />} />
                <Route
                  path="/world/departments/web-development-department"
                  element={<PrivateRoute component={Web} />}
                />
                <Route
                  path="/world/departments/administration"
                  element={<PrivateRoute component={Admin} />}
                />
                <Route
                  path="/world/departments/meeting-rooms"
                  element={<PrivateRoute component={Meeting} />}
                />
                <Route
                  path="/world/departments/meeting-evaluation/:id"
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
                  path="/world/desktop/my-dock"
                  element={<PrivateRoute component={MyDesktop} />}
                />
                <Route
                  path="/world/desktop/code-task"
                  element={<PrivateRoute component={CodeTask} />}
                />
                <Route
                  path="/world/desktop/task/verification/:id"
                  element={<PrivateRoute component={Verification} />}
                />
                <Route
                  path="/world/desktop/github-task"
                  element={<PrivateRoute component={GithubTask} />}
                />
                <Route
                  path="/world/desktop/github-activity"
                  element={<PrivateRoute component={GithubActivityTask} />}
                />
                <Route path="/preworld/test" element={<PrivateRoute component={Test} />} />
                <Route
                  path="/preworld/test/result"
                  element={<PrivateRoute component={TestResult} />}
                />
                <Route path="/preworld/quiz" element={<PrivateRoute component={Quiz} />} />
                <Route
                  path="/preworld/quiz/result"
                  element={<PrivateRoute component={QuizResult} />}
                />
                <Route path="/preworld/open-jobs" element={<PrivateRoute component={OpenJobs} />} />
                <Route path="/preworld/apply" element={<PrivateRoute component={Apply} />} />
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
      />{' '}
    </div>
  )
}

export default withSounds()(withStyles(styles)(AppLayout))
