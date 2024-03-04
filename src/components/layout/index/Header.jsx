import {
  Words,
  Header as ArwesHeader,
  Highlight,
  withStyles,
  Frame,
  Button,
} from "arwes";
import { Link } from "react-router-dom";
import Clickable from "../../publicComp/Clickable";
import React, { useState, useEffect, useRef } from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import SlidingPanel from "react-sliding-side-panel";
import "react-sliding-side-panel/lib/index.css";
import { MdNotificationsActive } from "react-icons/md";
import NotificationsPanel from "../../shared/NotificationsPanel";
import ChatPanel from "../../shared/ChatPanel";
import { MdMarkUnreadChatAlt } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { RiUserLine } from "react-icons/ri";
import { VscScreenFull } from "react-icons/vsc";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "50px",
    margin: "auto",
    paddingLeft: "2em",
  },
  link: {
    display: "flex",
    alignItems: "center",
  },
  nav: {
    display: "inherit",
  },
  icons: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "20%",
    marginRight: "2em",
    alignItems: "center",
  },
  button: {
    padding: [0, theme.padding / 2],
  },
  "@media (max-width: 800px)": {
    button: {
      padding: [0, 8],
    },
    clickable: {
      fontSize: 16,
    },
    root: {
      paddingLeft: "1em",
    },
    icons: {
      marginRight: "1em",
      width: "auto",
    },
  },
  timer: {
    fontFamily: "monospace",
  },
});

const Header = (props) => {
  const toggleFullSceen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChatPanel, setShowChatPanel] = useState(false);
  const notificationRef = useRef(null);
  const chatRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = () => {
      setShowNotifications(false);

      setShowChatPanel(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications, showChatPanel]);

  const { classes, onNav, ...rest } = props;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      // Update time every second
      setTime((prevTime) => {
        let { hours, minutes, seconds } = prevTime;
        seconds++;
        if (seconds === 60) {
          seconds = 0;
          minutes++;
          if (minutes === 60) {
            minutes = 0;
            hours++;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatWithLeadingZeros = (number) => {
    return number < 10 ? `0${number}` : `${number}`;
  };
  return (
    <ArwesHeader
      animate
      style={{
        width: "100%",
      }}
    >
      <div className={classes.root} {...rest}>
        <div className={classes.nav}>
          <Clickable className={classes.clickable} onClick={onNav}>
            <Highlight className={classes.button}>
              <Link className={classes.link} to="/">
                <img
                  src="/img/logo.svg"
                  width={40}
                  height={40}
                  alt="Logo"
                ></img>

                <Words animate>&nbsp; &nbsp;AINEXIM</Words>
              </Link>
            </Highlight>
          </Clickable>
          <Link to="/world/desktop/code-task" className="slide-panel-item">
            <Button layer={"success"} animate className="checkin">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Words animate> Check-in &nbsp;</Words>
                <RiLogoutCircleRLine size={20} />
              </div>
            </Button>
          </Link>
        </div>

        {isMobile && (
          <div className={classes.icons}>
            <Clickable onClick={toggleMenu}>
              {showMenu ? <CiMenuFries size={30} /> : <CiMenuFries size={30} />}
            </Clickable>
          </div>
        )}

        {!isMobile && (
          <div className={classes.icons}>
            <div className={classes.timer}>
              {formatWithLeadingZeros(time.hours)}:
              {formatWithLeadingZeros(time.minutes)}:
              {formatWithLeadingZeros(time.seconds)}
            </div>
            <Clickable>
              <Link to="/profile">
                <RiUserLine size={30} />
              </Link>
            </Clickable>
            <Clickable onClick={() => setShowChatPanel(!showChatPanel)}>
              <MdMarkUnreadChatAlt size={30} />
            </Clickable>

            {showChatPanel && (
              <div ref={chatRef}>
                <ChatPanel />
              </div>
            )}
            <Clickable onClick={() => setShowNotifications(!showNotifications)}>
              <MdNotificationsActive size={30} />
            </Clickable>
            {showNotifications && (
              <div ref={notificationRef}>
                <NotificationsPanel />
              </div>
            )}
            <Clickable>
              <Link to="/login">
                <RiLogoutCircleLine size={30} />
              </Link>
            </Clickable>

            <Clickable onClick={() => toggleFullSceen()}>
              <VscScreenFull size={30} />
            </Clickable>
          </div>
        )}
      </div>

      {showMenu && isMobile && (
        <SlidingPanel type={"left"} isOpen={showMenu} size={60}>
          <Frame animate>
            <div className="slide-panel">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1em",
                }}
              >
                <img src="/img/logo.svg" width={60} height={90}></img>
                <Clickable onClick={toggleMenu} className="close-button">
                  <IoCloseOutline size={30} />
                </Clickable>
              </div>
              <Clickable onClick={onNav}>
                <Link to="/profile" className="slide-panel-item">
                  <RiUserLine size={30} />
                  <Words animate>Profile</Words>
                </Link>
              </Clickable>

              <br></br>
              <Clickable onClick={onNav}>
                <Link to="/chat" className="slide-panel-item">
                  <MdMarkUnreadChatAlt size={30} />
                  <Words animate>Chat</Words>
                </Link>
              </Clickable>
              <br></br>
              <Clickable onClick={onNav}>
                <Link to="/notifications" className="slide-panel-item">
                  <MdNotificationsActive size={30} />
                  <Words animate>All Notifications</Words>
                </Link>
              </Clickable>
              <br></br>
              <Clickable onClick={onNav}>
                <Link to="/login" className="slide-panel-item">
                  <RiLogoutCircleLine size={30} />
                  <Words animate>Login</Words>
                </Link>
              </Clickable>
            </div>
          </Frame>
        </SlidingPanel>
      )}
    </ArwesHeader>
  );
};

export default withStyles(styles)(Header);
