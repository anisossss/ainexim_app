import { withStyles } from "arwes";
import TestResultFrame from "../../../components/preworld/test/TestResultFrame";
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

const TestResult = (props) => {
  const { classes, className } = props;
  return <TestResultFrame />;
};

export default withStyles(styles)(TestResult);
