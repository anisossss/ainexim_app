import { Highlight, withStyles } from "arwes";
import { Frame } from "arwes";
import OpenJobsFrame from "../../../components/preworld/openjobs/OpenJobsFrame";
const styles = () => ({
  root: {
    width: 1200,
    marginLeft: "20%",
  },
  "@media (max-width: 800px)": {
    root: {
      margin: "0 12px",
    },
  },
});

const OpenJobs = (props) => {
  const { classes, className } = props;
  return <OpenJobsFrame />;
};

export default withStyles(styles)(OpenJobs);
