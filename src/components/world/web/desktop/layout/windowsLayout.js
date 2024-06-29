import React, { useState, useEffect } from "react";
import { withStyles } from "arwes";
import {
  IoLogoApple,
  IoIosWifi,
  IoIosBluetooth,
  IoIosSwitch,
} from "react-icons/io";
import { IoVolumeHigh, IoBatteryCharging } from "react-icons/io5";
import CodeTaskFrame from "../tasks/dev/CodeTaskFrame";
import GithubTaskFrame from "../tasks/github/GithubTaskFrame";

const styles = (theme) => ({
  desktop: {
    position: "relative",
    width: "100%",
    height: "80vh",
    backgroundImage: "url(/img/wallpapers/windows.jpg)",
    color: "black",
    backgroundSize: "cover",
  },
  dock: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    height: 80,
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    width: "100%",
    padding: "10px 20px",
    justifyContent: "space-between",
  },
  dockItems: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    margin: "auto",
  },
  menuItem: {
    cursor: "pointer",
  },
  dockItem: {
    margin: "0 10px",
    cursor: "pointer",
    transition: "transform 0.2s",

    "& img": {
      width: 40,
      height: 40,
    },
  },
  systemIcons: {
    display: "flex",
    alignItems: "center",
    color: "white",
  },
  systemIcon: {
    margin: "0 5px",
    fill: "white",
    color: "white",
  },
  timeDate: {
    marginLeft: "15px",
    color: "white",
  },
});

const WindowsLayout = ({ classes, userName, selectOS }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeDockItem, setActiveDockItem] = useState(null);
  const handleDockItemClick = (index) => {
    setActiveDockItem(index === activeDockItem ? null : index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = currentTime.toLocaleDateString();
  const dockItems = [
    {
      label: "File Explorer",
      icon: "/img/svg/files.svg",
      command: () => handleDockItemClick(0),
    },
    {
      label: "Chrome",
      icon: "/img/svg/google.png",
      command: () => handleDockItemClick(1),
    },
    {
      label: "Terminal",
      icon: "/img/svg/terminal_windows.png",
      command: () => handleDockItemClick(2),
    },
    {
      label: "VS Code",
      icon: "/img/svg/vscode.png",
      command: () => handleDockItemClick(3),
    },
    {
      label: "GitHub",
      icon: "/img/svg/github.svg",
      command: () => handleDockItemClick(4),
    },
    {
      label: "Bin",
      icon: "/img/svg/bin_windows.png",
      command: () => handleDockItemClick(5),
    },
  ];

  return (
    <div className={classes.desktop}>
      <div className={classes.dock}>
        <img
          src={"/img/svg/windows.png"}
          alt="windows"
          width={70}
          onClick={() => selectOS("Ubuntu")}
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
        <div className={classes.systemIcons}>
          <IoIosWifi className={classes.systemIcon} />
          <IoVolumeHigh className={classes.systemIcon} />
          <IoBatteryCharging className={classes.systemIcon} />
          <div className={classes.timeDate}>
            <div>{formattedTime}</div>
            <div>{formattedDate}</div>
          </div>
        </div>
      </div>

      {activeDockItem === 4 && (
        <div className={classes.modalFrame}>
          <GithubTaskFrame height="74vh" />
        </div>
      )}
      {activeDockItem === 3 && (
        <div className={classes.modalBackdrop}>
          <CodeTaskFrame height="68vh" />
        </div>
      )}
      {activeDockItem === 1 && (
        <div className={classes.iframeContainer}>
          <iframe
            id="if1"
            width="100%"
            height="475"
            src="https://www.google.com/search?igu=1"
            alt=""
            title="google"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(WindowsLayout);
