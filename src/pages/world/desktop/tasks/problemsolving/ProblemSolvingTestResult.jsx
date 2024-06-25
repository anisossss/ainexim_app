import { withStyles } from "arwes";
import ProblemSolvingTestResultFrame from "../../../../../components/world/desktop/tasks/problemsolvingtest/ProblemSolvingTestResultFrame";
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

const ProblemSolvingTestResult = (props) => {
  const { classes, className } = props;
  return <ProblemSolvingTestResultFrame />;
};

export default withStyles(styles)(ProblemSolvingTestResult);
