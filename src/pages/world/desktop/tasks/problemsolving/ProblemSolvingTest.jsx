import { withStyles } from "arwes";
import ProblemSolvingTestFrame from "../../../../../components/world/web/desktop/tasks/problemsolvingtest/ProblemSolvingTestFrame";
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

const ProblemSolvingTest = (props) => {
  const { classes, className } = props;
  return <ProblemSolvingTestFrame />;
};

export default withStyles(styles)(ProblemSolvingTest);
