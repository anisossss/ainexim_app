import { withStyles } from "arwes";
import QuizFrame from "../../../components/world/desktop/tasks/quiz/WebQuizFrame";
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

const Quiz = (props) => {
  const { classes, className } = props;
  return <QuizFrame />;
};

export default withStyles(styles)(Quiz);
