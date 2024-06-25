import { Highlight, withStyles } from "arwes";
import WebQuizResultFrame from "../../../components/world/desktop/tasks/quiz/WebQuizResultFrame";
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

const WebQuizResult = (props) => {
  const { classes, className } = props;
  return <WebQuizResultFrame />;
};

export default withStyles(styles)(WebQuizResult);
