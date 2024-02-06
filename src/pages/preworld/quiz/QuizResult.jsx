import { Highlight, withStyles } from "arwes";
import QuizResultFrame from "../../../components/preworld/quiz/QuizResultFrame";
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

const QuizResult = (props) => {
  const { classes, className } = props;
  return <QuizResultFrame />;
};

export default withStyles(styles)(QuizResult);
