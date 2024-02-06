import React from "react";
import { Frame, Highlight, withStyles, Words } from "arwes";
import { CONSTANTS } from "../../constants/api";

const styles = () => ({
  content: {
    display: "flex",
    padding: 20,
  },
  picture: {
    borderRadius: "50%",
    marginRight: 20,
  },
  userDetails: {
    marginTop: "0.5em",
  },
  details: {
    marginBottom: "0.5em",
  },
  progressBar: {
    marginTop: 20,
    padding: 20,
  },
  personalInfo: {},
  progressSection: {},
  top_section: {
    display: "flex",
    alignItems: "center",
  },
  "@media (max-width: 800px)": {
    root: {
      margin: "0 12px",
    },
  },
  badge: {
    display: "inline-block",
    padding: "0.2em 0.5em",
    borderRadius: "1em",
    background: "#029DBB",
    color: "#fff",
    margin: "0.5em 0",
  },
});

const ProfilePanel = (props) => {
  const { classes, className } = props;

  return (
    <Frame animate={true}>
      <div className={classes.content}>
        <div className={classes.personalInfo}>
          <div className={classes.top_section}>
            <img
              src="/img/avatars/me.jpeg"
              alt="Profile Picture"
              className={classes.picture}
              style={{ objectFit: "cover", width: "8em", height: "8em" }}
            />
            <div>
              <div>
                <b>Anis Khalef</b>
              </div>

              <span className={classes.badge}>Web Developer</span>
            </div>
          </div>

          <div className={classes.userDetails}>
            <div>
              <b>Email</b>
            </div>
            <div className={classes.details}>
              <span>anis.khalef98@ainexim.com</span>
            </div>
            <div>
              <b>Location</b>
            </div>
            <div className={classes.details}>
              <span>Sousse, Tunisia</span>
            </div>
            <div>
              <b>Current career:</b>
            </div>
            <div className={classes.details}>
              <span>Frontend Developer</span>
            </div>
            <div>
              <b>Department</b>
            </div>
            <div className={classes.details}>
              <span>Software Development</span>
            </div>
            <div>
              <b>Level</b>
            </div>
            <div className={classes.details}>
              <span>Expert</span>
            </div>
          </div>
        </div>
        <hr className={classes.hr}></hr>
        <div className={classes.progressSection}>
          <Words> Task 1:</Words>
          <div>
            <progress value="70" max="100"></progress>
          </div>
          <Highlight>
            <Words> Task 2:</Words>
          </Highlight>
          <div>
            <progress value="70" max="100"></progress>
          </div>
          <Highlight>
            <Words> Task 3:</Words>
          </Highlight>
          <div>
            <progress value="70" max="100"></progress>
          </div>
        </div>
      </div>
    </Frame>
  );
};

export default withStyles(styles)(ProfilePanel);
