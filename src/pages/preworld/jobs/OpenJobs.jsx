import { Highlight, withStyles } from "arwes";
import { Helmet } from "react-helmet";
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
  return (
    <>
      <Helmet title="Open Jobs | AINEXIM" />
      <OpenJobsFrame />
    </>
  );
};

export default withStyles(styles)(OpenJobs);
