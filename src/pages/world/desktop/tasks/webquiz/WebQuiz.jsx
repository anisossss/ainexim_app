import { withStyles } from "arwes";
import WebQuizFrame from "components/world/web/desktop/tasks/quiz/WebQuizFrame";
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

const WebQuiz = (props) => {
  const { classes, className } = props;
  return <WebQuizFrame />;
};

export default withStyles(styles)(WebQuiz);
