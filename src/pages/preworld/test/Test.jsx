import { withStyles } from "arwes";
import SoftwareTestFrame from "../../../components/preworld/softwaretest/SoftwareTestFrame";
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

const SoftwareTest = (props) => {
  const { classes, className } = props;
  return <SoftwareTestFrame />;
};

export default withStyles(styles)(SoftwareTest);
