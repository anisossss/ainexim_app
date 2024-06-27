import { withStyles } from "arwes";
import SoftwareQuizFrame from "../../../components/preworld/softwarequiz/SoftwareQuizFrame";
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

const SoftwareQuiz = (props) => {
  const { classes, className } = props;
  return <SoftwareQuizFrame />;
};

export default withStyles(styles)(SoftwareQuiz);
