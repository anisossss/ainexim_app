import { withStyles } from "arwes";
import ApplyFrame from "../../../components/preworld/openjobs/ApplyFrame";
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

const Apply = (props) => {
  const { classes, className } = props;
  return <ApplyFrame />;
};

export default withStyles(styles)(Apply);
