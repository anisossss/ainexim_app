import { withStyles } from "arwes";
import TestFrame from "../../../components/preworld/test/TestFrame";
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

const Test = (props) => {
  const { classes, className } = props;
  return <TestFrame />;
};

export default withStyles(styles)(Test);
