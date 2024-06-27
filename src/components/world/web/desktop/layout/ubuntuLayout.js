import React, { useState, useEffect, useRef } from "react";
import { withStyles } from "arwes";
import { IoIosWifi } from "react-icons/io";
import { IoVolumeHigh } from "react-icons/io5";
import { FaUbuntu } from "react-icons/fa6";
import { FaNetworkWired } from "react-icons/fa";
import { IoPower } from "react-icons/io5";
import CodeTaskFrame from "../tasks/dev/CodeTaskFrame";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const styles = (theme) => ({
  desktop: {
    position: "relative",
    width: "100%",
    height: "80vh",
    backgroundImage: "url(/img/wallpapers/ubuntu.jpg)",
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
    color: "white",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
  },
  menuItem: {
    margin: "0 15px",
    color: "white",
    cursor: "pointer",
  },
  systemIcons: {
    display: "flex",
    alignItems: "center",
  },
  systemIcon: {
    margin: "0 5px",
    fill: "white",
    color: "white",
  },
  dock: {
    position: "absolute",
    top: 35,
    left: 0,
    width: 100,
    height: "75vh",
    backgroundColor: "#2c2c2c",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  dockItem: {
    cursor: "pointer",
    marginTop: "15px",

    "& img": {
      width: 50,
      height: 50,
    },
  },
  dateContainer: {
    flex: 1,
    textAlign: "center",
    color: "white",
  },
  modalFrame: {
    paddingLeft: "5em",
    paddingTop: "2em",
  },
  iframeContainer: {
    paddingTop: "2em",
    paddingLeft: "5.5em",
  },
});

const UbuntuLayout = ({ classes, userName, selectOS }) => {
  const [activeDockItem, setActiveDockItem] = useState(null);
  const handleDockItemClick = (index) => {
    setActiveDockItem(index === activeDockItem ? null : index);
  };

  const [formattedTime, setFormattedTime] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const handleRhythmboxClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      setFormattedTime(now.toLocaleDateString("en-US", options));
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000);

    return () => clearInterval(intervalId);
  }, []);
  const dockItems = [
    {
      label: "Files",
      icon: "/img/svg/folder.png",
      command: () => handleDockItemClick(0),
    },
    {
      label: "VSCode",
      icon: "/img/svg/vscode.png",
      command: () => handleDockItemClick(1),
    },
    {
      label: "Terminal",
      icon: "/img/svg/terminal.png",
      command: () => handleDockItemClick(2),
    },
    {
      label: "Firefox",
      icon: "/img/svg/firefox.png",
      command: () => handleDockItemClick(3),
    },
    {
      label: "Rhythmebox",
      icon: "/img/svg/rhythmebox.png",
      command: () => handleDockItemClick(4),
    },
    {
      label: "GitHub",
      icon: "/img/svg/github.svg",
      command: () => handleDockItemClick(5),
    },
    {
      label: "Trash",
      icon: "/img/svg/bin.png",
      command: () => handleDockItemClick(6),
    },
  ];

  return (
    <div className={classes.desktop}>
      <audio ref={audioRef} src="/sound/dev_bg.mp3"></audio>
      <div className={classes.actionBar}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaUbuntu
            className={classes.menuItem}
            onClick={() => selectOS("Kali")}
          />
          <div className={classes.menuItem}>Applications</div>
          <div className={classes.menuItem}>Places</div>
          <div className={classes.menuItem}>System</div>
        </div>
        <div className={classes.dateContainer}>{formattedTime}</div>
        <div className={classes.systemIcons}>
          <IoVolumeHigh className={classes.systemIcon} />
          <IoIosWifi className={classes.systemIcon} />
          <FaNetworkWired className={classes.systemIcon} />

          <IoPower className={classes.systemIcon} />
        </div>
      </div>

      <div className={classes.dock}>
        {dockItems.map((item, index) => (
          <div key={index} className={classes.dockItem} onClick={item.command}>
            <img src={item.icon} alt={item.label} />
          </div>
        ))}
      </div>
      {activeDockItem === 1 && (
        <div className={classes.modalFrame}>
          <CodeTaskFrame height="75vh" width="100%" paddingLeft="8em" />
        </div>
      )}
      {activeDockItem === 3 && (
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
      {activeDockItem === 1 && <div className={classes.iframeContainer}></div>}
    </div>
  );
};

export default withStyles(styles)(UbuntuLayout);
