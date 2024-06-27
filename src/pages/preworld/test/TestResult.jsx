import { Highlight, withStyles } from "arwes";
import SoftwareTestResultFrame from "../../../components/preworld/softwaretest/SoftwareTestResultFrame";
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

const SoftwareTestResult = (props) => {
  const { classes, className } = props;
  return <SoftwareTestResultFrame />;
};

export default withStyles(styles)(SoftwareTestResult);
