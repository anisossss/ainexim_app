import { CONSTANTS } from "../../constants/api";
import { Frame, Highlight, withStyles, Words } from "arwes";

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
  },
  userDetails: {
    marginTop: "0.5em",
  },
  hr: {},
  details: {
    marginBottom: "0.5em",
  },
  progressBar: {},
  personalInfo: {
    width: "40%",
  },
  progressSection: {
    width: "50%",
    justifyContent: "center",
  },
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
});
const ProfileSettingsPanel = (props) => {
  const { classes, className } = props;
  return (
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
        <div>
          <Highlight>
            <Words style={{ fontWeight: "bold" }}>Current Project </Words>
          </Highlight>
          <Highlight>
            <Words>AINEXIM SHOWCASE WEBSITE</Words>
          </Highlight>
        </div>
        <br></br>
        <div className={classes.progress}>
          <div className={classes.header}>
            <Highlight>
              <Words>Total Achievements: </Words>
            </Highlight>
            <Highlight>
              <Words>08/100</Words>
            </Highlight>
          </div>
          <progress value="8" max="100"></progress>
        </div>
        <br></br>
        <div className={classes.progress}>
          <div className={classes.header}>
            <Highlight>
              <Words>Total Missions: </Words>
            </Highlight>
            <Highlight>
              <Words>20/100</Words>
            </Highlight>
          </div>
          <progress value="20" max="100"></progress>
        </div>
        <br></br>
        <div className={classes.progress}>
          <div className={classes.header}>
            <Highlight>
              <Words>Total Tasks: </Words>
            </Highlight>
            <Highlight>
              <Words>45/100</Words>
            </Highlight>
          </div>
          <progress value="45" max="100"></progress>
        </div>
        <br></br>
        <div className={classes.progress}>
          <div className={classes.header}>
            <Highlight>
              <Words>Total projects: </Words>
            </Highlight>
            <Highlight>
              <Words>06/100</Words>
            </Highlight>
          </div>
          <progress value="06" max="100"></progress>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(ProfileSettingsPanel);
