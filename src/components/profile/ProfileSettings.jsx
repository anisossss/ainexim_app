import React, { useEffect, useRef, useState } from "react";
import { Button, Frame, Highlight, withStyles, Words } from "arwes";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/Auth/authSelectors";
import { FaPen } from "react-icons/fa";
import { updateUser } from "../../redux/Auth/authOperations";
import { toast } from "react-toastify";

const styles = () => ({
  content: {
    display: "flex",
    padding: 20,
    justifyContent: "center",
    textAlign: "left",
    width: "100%",
  },
  picture: {
    borderRadius: "50%",
    marginRight: 20,
    cursor: "pointer",
  },
  userDetails: {
    marginTop: "0.5em",
  },
  details: {
    marginBottom: "0.5em",
  },
  personalInfo: {
    width: "50%",
  },

  top_section: {
    display: "flex",
    alignItems: "center",
    textAlign: "left",
  },
  "@media (max-width: 800px)": {
    root: {
      margin: "0 12px",
    },
  },
  badge: {
    width: "150px",
    textAlign: "center",
    display: "inline-block",
    padding: "0.2em 0.5em",
    borderRadius: "1em",
    background: "#029DBB",
    color: "#fff",
    margin: "0.5em 0",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
});

const ProfileSettingsPanel = (props) => {
  const { classes, className } = props;
  const [avatar, setAvatar] = useState(null);

  const userData = useSelector(selectUser);
  const user = userData ? userData?.user : null;

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleAvatarUpdate = async () => {
    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      updateUser(formData);
      toast.success("Avatar updated successfully.");
    } catch (error) {
      console.error("Error updating avatar:", error);
      alert("Error updating avatar. Please try again later.");
    }
  };
  return (
    <div className={classes.content}>
      <div className={classes.personalInfo}>
        <div className={classes.top_section}>
          <div>
            <label htmlFor="avatarInput">
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="Profile Avatar"
                  className={classes.picture}
                  style={{ objectFit: "cover", width: "8em", height: "8em" }}
                />
              ) : (
                <img
                  src={user?.avatar}
                  alt="Profile Avatar"
                  className={classes.picture}
                  style={{ objectFit: "cover", width: "8em", height: "8em" }}
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
                id="avatarInput"
              />
            </label>
          </div>

          <div>
            <div style={{ textTransform: "uppercase" }}>
              <b>{user?.name}</b>
            </div>

            <span className={classes.badge}>Web Developer</span>
          </div>
        </div>

        <div className={classes.userDetails}>
          <div className={classes.details}>
            <b>Email:</b> <span>{user.email}</span> <FaPen />
          </div>
          <div className={classes.details}>
            <b>Location:</b> <span>Sousse, Tunisia</span> <FaPen />
          </div>

          <div className={classes.details}>
            <b>Password</b> <FaPen />
          </div>
        </div>
        <br></br>
        <Button onClick={handleAvatarUpdate}>Update Profile</Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(ProfileSettingsPanel);
