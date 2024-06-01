import { Words, Header as ArwesHeader, Highlight, withStyles, Frame, Button } from 'arwes'
import { Link } from 'react-router-dom'
import Clickable from '../../publicComp/Clickable'
import React, { useState, useEffect, useRef } from 'react'
import { CiMenuFries } from 'react-icons/ci'
import { IoCloseOutline } from 'react-icons/io5'
import SlidingPanel from 'react-sliding-side-panel'
import 'react-sliding-side-panel/lib/index.css'
import { MdNotificationsActive } from 'react-icons/md'
import NotificationsPanel from '../../shared/NotificationsPanel'
import ChatPanel from '../../shared/ChatPanel'
import { MdMarkUnreadChatAlt } from 'react-icons/md'
import { RiLogoutCircleLine } from 'react-icons/ri'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import { RiUserLine } from 'react-icons/ri'
import { VscScreenFull } from 'react-icons/vsc'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/Auth/authOperations'
import { useAuth } from 'hooks'
import { toast } from 'react-toastify'

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '50px',
    margin: 'auto',
    paddingLeft: '2em',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
  },
  nav: {
    display: 'inherit',
  },
  icons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '20%',
    marginRight: '2em',
    alignItems: 'center',
  },
  checkin: {
    marginTop: '-14px',
    width: '12%',
    alignItems: 'center',
  },

  '@media (max-width: 800px)': {
    button: {
      padding: [0, 8],
    },
    clickable: {
      fontSize: 16,
    },
    root: {
      paddingLeft: '1em',
    },
    icons: {
      marginRight: '1em',
      width: 'auto',
    },
  },
  timer: {
    fontFamily: 'monospace',
  },
})

const Header = (props) => {
  const toggleFullSceen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }
  const [showNotifications, setShowNotifications] = useState(false)
  const [showChatPanel, setShowChatPanel] = useState(false)
  const notificationRef = useRef(null)
  const chatRef = useRef(null)
  const dispatch = useDispatch()

  const { classes, onNav, ...rest } = props
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800)
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        let { hours, minutes, seconds } = prevTime
        seconds++
        if (seconds === 60) {
          seconds = 0
          minutes++
          if (minutes === 60) {
            minutes = 0
            hours++
          }
        }
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatWithLeadingZeros = (number) => {
    return number < 10 ? `0${number}` : `${number}`
  }
  const { token } = useAuth() || {}
  const isLoggedIn = !!token
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap()
      toast.success('You have successfully logged out.')
    } catch (rejectedValueOrSerializedError) {
      toast.error(rejectedValueOrSerializedError)
    }
  }
  const notificationTimeoutRef = useRef(null)
  const chatTimeoutRef = useRef(null)

  const handleNotificationMouseEnter = () => {
    clearTimeout(notificationTimeoutRef.current)
    setShowNotifications(true)
  }

  const handleNotificationMouseLeave = () => {
    notificationTimeoutRef.current = setTimeout(() => {
      setShowNotifications(false)
    }, 90)
  }

  const handleNotificationPanelMouseEnter = () => {
    clearTimeout(notificationTimeoutRef.current)
    setShowNotifications(true)
  }

  const handleNotificationPanelMouseLeave = () => {
    notificationTimeoutRef.current = setTimeout(() => {
      setShowNotifications(false)
    }, 100)
  }

  const handleChatMouseEnter = () => {
    clearTimeout(chatTimeoutRef.current)
    setShowChatPanel(true)
  }

  const handleChatMouseLeave = () => {
    chatTimeoutRef.current = setTimeout(() => {
      setShowChatPanel(false)
    }, 100)
  }

  const handleChatPanelMouseEnter = () => {
    clearTimeout(chatTimeoutRef.current)
    setShowChatPanel(true)
  }

  const handleChatPanelMouseLeave = () => {
    chatTimeoutRef.current = setTimeout(() => {
      setShowChatPanel(false)
    }, 100)
  }
  return (
    <ArwesHeader animate>
      <div className={classes.root} {...rest}>
        <div className={classes.nav}>
          <Clickable className={classes.clickable} onClick={onNav}>
            <Highlight className={classes.button}>
              <Link className={classes.link} to="/dashboard ">
                <img src="/img/logo.svg" width={40} height={40} alt="Logo"></img>
                <Words animate>&nbsp; &nbsp;AINEXIM</Words>
              </Link>
            </Highlight>
          </Clickable>
        </div>

        {isMobile && isLoggedIn && (
          <div className={classes.icons}>
            <Clickable onClick={toggleMenu}>
              {showMenu ? <CiMenuFries size={30} /> : <CiMenuFries size={30} />}
            </Clickable>
          </div>
        )}

        {!isMobile && isLoggedIn && (
          <div className={classes.icons}>
            <div className={classes.timer}>
              {formatWithLeadingZeros(time.hours)}:{formatWithLeadingZeros(time.minutes)}:
              {formatWithLeadingZeros(time.seconds)}
            </div>
            <Clickable className="left_side_nav">
              <Link to="/profile">
                <RiUserLine size={30} />
              </Link>
            </Clickable>

            <Clickable
              onMouseEnter={handleNotificationMouseEnter}
              onMouseLeave={handleNotificationMouseLeave}
              className="left_side_nav"
            >
              <MdNotificationsActive size={30} />
            </Clickable>

            <Clickable
              onMouseEnter={handleChatMouseEnter}
              onMouseLeave={handleChatMouseLeave}
              className="left_side_nav"
            >
              <MdMarkUnreadChatAlt size={30} />
            </Clickable>

            {showChatPanel && (
              <div
                ref={chatRef}
                onMouseEnter={handleChatPanelMouseEnter}
                onMouseLeave={handleChatPanelMouseLeave}
              >
                <ChatPanel isOpen={showChatPanel} />
              </div>
            )}

            {showNotifications && (
              <div
                ref={notificationRef}
                onMouseEnter={handleNotificationPanelMouseEnter}
                onMouseLeave={handleNotificationPanelMouseLeave}
              >
                <NotificationsPanel isOpen={showNotifications} />
              </div>
            )}
            <Clickable onClick={handleLogout} className="left_side_nav">
              <RiLogoutCircleLine size={30} />
            </Clickable>
            <Clickable onClick={() => toggleFullSceen()} className="left_side_nav">
              <VscScreenFull size={30} />
            </Clickable>
          </div>
        )}

        {!isLoggedIn && (
          <div className={classes.checkin}>
            <Link to="/world/desktop/code-task" className="slide-panel-item">
              <Button layer={'success'} animate className="checkin">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Words animate> Check-in &nbsp;</Words>
                  <RiLogoutCircleRLine size={20} />
                </div>
              </Button>
            </Link>
          </div>
        )}
      </div>

      {showMenu && isMobile && isLoggedIn && (
        <SlidingPanel type={'left'} isOpen={showMenu} size={60}>
          <Frame animate>
            <div className="slide-panel">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1em',
                }}
              >
                <img src="/img/logo.svg" width={60} height={90} alt="AINEXIM" />
                <Clickable onClick={toggleMenu} className="close-button">
                  <IoCloseOutline size={30} />
                </Clickable>
              </div>
              <Link to="/profile" className="slide-panel-item">
                <RiUserLine size={30} />
                <Words animate>&nbsp;My Profile</Words>
              </Link>
              <Clickable
                onClick={() => setShowChatPanel(!showChatPanel)}
                className="slide-panel-item"
              >
                <MdMarkUnreadChatAlt size={30} />
                <Words animate>&nbsp;All Chat</Words>
              </Clickable>
              <Clickable
                onClick={() => setShowNotifications(!showNotifications)}
                className="slide-panel-item"
              >
                <MdNotificationsActive size={30} />
                <Words animate>&nbsp;All Notifications</Words>
              </Clickable>

              <Clickable onClick={() => toggleFullSceen()} className="slide-panel-item">
                <VscScreenFull size={30} />
                <Words animate> &nbsp;Enter Fullscreen Mode</Words>
              </Clickable>
            </div>
          </Frame>
        </SlidingPanel>
      )}
    </ArwesHeader>
  )
}

export default withStyles(styles)(Header)
