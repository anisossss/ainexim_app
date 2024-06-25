import React, { useState, useEffect } from "react";
import { withStyles } from "arwes";
import { IoLogoApple, IoIosWifi, IoIosBluetooth } from "react-icons/io";
import { IoVolumeHigh } from "react-icons/io5";
import { IoBatteryCharging } from "react-icons/io5";
import CodeTaskFrame from "../tasks/dev/CodeTaskFrame";
import GithubTaskFrame from "../tasks/github/GithubTaskFrame";
import { useLocation } from "react-router-dom";

const styles = (theme) => ({
  desktop: {
    position: "relative",
    width: "100%",
    height: "80vh",
    backgroundImage: "url(/img/wallpapers/macos.jpg)",
    color: "black",
    backgroundSize: "cover",
  },
  actionBar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 35,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    webkitBackdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    zIndex: 10,
    fontSize: 14,
    color: "black",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
  },
  menuItem: {
    margin: "0 15px",
    color: "black",
    cursor: "pointer",
    alignItems: "center",
  },
  systemIcons: {
    display: "flex",
    alignItems: "center",
  },
  systemIcon: {
    margin: "0 5px",
    fill: "black",
    color: "black",
  },
  dock: {
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: "translateX(-50%)",
    height: 70,
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "10px 20px",
    borderRadius: 20,
  },
  dockItem: {
    margin: "0 10px",
    cursor: "pointer",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.5)",
    },
    "& img": {
      width: 45,
      height: 45,
    },
  },
  modalFrame: {
    paddingTop: 30,
  },
  iframeContainer: {
    paddingTop: "2em",
  },
});

const MacOSLayout = ({ classes, userName, formattedTime, selectOS }) => {
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.openGithub) {
      setActiveDockItem(5);
    }
  }, [location]);
  const [activeDockItem, setActiveDockItem] = useState(null);
  const handleDockItemClick = (index) => {
    setActiveDockItem(index === activeDockItem ? null : index);
  };
  const dockItems = [
    {
      label: "Finder",
      icon: "/img/svg/finder.svg",
      command: () => handleDockItemClick(0),
    },
    {
      label: "Terminal",
      icon: "/img/svg/terminal.svg",
      command: () => handleDockItemClick(1),
    },
    {
      label: "VS Code",
      icon: "/img/svg/vscode.png",
      command: () => handleDockItemClick(2),
    },
    {
      label: "App Store",
      icon: "/img/svg/appstore.svg",
      command: () => handleDockItemClick(3),
    },
    {
      label: "Safari",
      icon: "/img/svg/safari.svg",
      command: () => handleDockItemClick(4),
    },
    {
      label: "GitHub",
      icon: "/img/svg/github.svg",
      command: () => handleDockItemClick(5),
    },
    {
      label: "Trash",
      icon: "/img/svg/trash.png",
      command: () => handleDockItemClick(6),
    },
  ];

  return (
    <div className={classes.desktop}>
      <div className={classes.actionBar}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div className={classes.menuItem}>
            <IoLogoApple
              className={classes.systemIcon}
              size={28}
              onClick={() => selectOS("Windows")}
              style={{}}
            />
          </div>
          <div className={classes.menuItem}>Finder</div>
          <div className={classes.menuItem}>File</div>
          <div className={classes.menuItem}>Edit</div>
          <div className={classes.menuItem}>View</div>
          <div className={classes.menuItem}>Go</div>
          <div className={classes.menuItem}>Window</div>
          <div className={classes.menuItem}>Help</div>
        </div>
        <div className={classes.systemIcons}>
          <div className={classes.menuItem}>{userName}</div>
          <IoVolumeHigh className={classes.systemIcon} />
          <span className={classes.systemIcon}>{formattedTime}</span>
          <IoIosWifi className={classes.systemIcon} />
          <IoIosBluetooth className={classes.systemIcon} />
          <span className={classes.systemIcon}>100%</span>
          <IoBatteryCharging size={25} className={classes.systemIcon} />
        </div>
      </div>

      <div className={classes.dock}>
        {dockItems.map((item, index) => (
          <div key={index} className={classes.dockItem} onClick={item.command}>
            <img src={item.icon} alt={item.label} />
          </div>
        ))}
      </div>

      {activeDockItem === 5 && (
        <div className={classes.modalFrame}>
          <GithubTaskFrame />
        </div>
      )}
      {activeDockItem === 2 && (
        <div className={classes.modalFrame}>
          <CodeTaskFrame height="63vh" />
        </div>
      )}
      {activeDockItem === 4 && (
        <div className={classes.iframeContainer}>
          <iframe
            id="if1"
            width="100%"
            height="440"
            src="https://www.google.com/search?igu=1"
            alt=""
            title="google"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(MacOSLayout);
