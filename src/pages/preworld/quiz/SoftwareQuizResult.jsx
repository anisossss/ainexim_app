import { withStyles } from "arwes";
import SoftwareQuizResultFrame from "../../../components/preworld/softwarequiz/SoftwareQuizResultFrame";
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

const SoftwareQuizResult = (props) => {
  const { classes, className } = props;
  return <SoftwareQuizResultFrame />;
};

export default withStyles(styles)(SoftwareQuizResult);
