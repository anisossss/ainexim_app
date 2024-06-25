import React, { useState, useEffect } from "react";
import { withStyles } from "arwes";
import { FaLock } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { IoVolumeMedium } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";

import CodeTaskFrame from "../tasks/dev/CodeTaskFrame";
import GithubTaskFrame from "../tasks/github/GithubTaskFrame";

const styles = (theme) => ({
  desktop: {
    position: "relative",
    width: "100%",
    height: "80vh",
    backgroundImage: "url(/img/wallpapers/kali.webp)",
    color: "black",
    backgroundSize: "cover",
  },
  actionBar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 40,
    backgroundColor: "#23252C",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    zIndex: 10,
    fontSize: 14,
  },
  menuItem: {
    margin: "0 15px",
    alignItems: "center",
    cursor: "pointer",
  },
  systemIcons: {
    display: "flex",
    alignItems: "center",
  },
  dockItems: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "5px",
  },
  systemIcon: {
    margin: "0 5px",
  },
  dockItem: {
    margin: "0 10px",
    cursor: "pointer",
    "& img": {
      width: 20,
      height: 20,
    },
  },
  modalFrame: {
    paddingTop: 40,
  },
  iframeContainer: {
    paddingTop: "2.2em",
  },
});

const KaliLayout = ({ classes, userName, selectOS }) => {
  const [time, setTime] = useState(new Date());

  const [activeDockItem, setActiveDockItem] = useState(null);
  const handleDockItemClick = (index) => {
    setActiveDockItem(index === activeDockItem ? null : index);
  };
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dockItems = [
    {
      label: "Firefox",
      icon: "/img/svg/firefox.png",
      command: () => handleDockItemClick(0),
    },
    {
      label: "VSCode",
      icon: "/img/svg/vscode.png",
      command: () => handleDockItemClick(1),
    },
    {
      label: "Terminal",
      icon: "/img/svg/terminal_kali.png",
      command: () => handleDockItemClick(2),
    },
  ];

  return (
    <div className={classes.desktop}>
      <div className={classes.actionBar}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={"/img/svg/kali-www.png"}
            alt="kali"
            width={25}
            onClick={() => selectOS("macOS")}
            className={classes.menuItem}
          />
          <div className={classes.dockItems}>
            {dockItems.map((item, index) => (
              <div
                key={index}
                className={classes.dockItem}
                onClick={item.command}
              >
                <img src={item.icon} alt={item.label} />
              </div>
            ))}
          </div>
        </div>
        <div className={classes.systemIcons}>
          <div className={classes.menuItem}>{userName}</div>
          <IoVolumeMedium className={classes.systemIcon} />
          <IoMdNotifications className={classes.systemIcon} />
          <span className={classes.systemIcon}>{formattedTime}</span>
          <span>|</span>
          <FaLock className={classes.systemIcon} />
          <RiLogoutCircleRLine className={classes.systemIcon} />
        </div>
      </div>
      <div>
        {activeDockItem === 2 && (
          <div className={classes.modalFrame}>
            <GithubTaskFrame height="74vh" />
          </div>
        )}
        {activeDockItem === 1 && (
          <div className={classes.modalFrame}>
            <CodeTaskFrame height="74vh" />
          </div>
        )}
        {activeDockItem === 0 && (
          <div className={classes.iframeContainer}>
            <iframe
              id="if1"
              width="100%"
              height="520"
              src="https://www.google.com/search?igu=1"
              alt=""
              title="google"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(KaliLayout);
