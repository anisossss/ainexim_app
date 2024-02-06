import { Highlight, withStyles } from "arwes";
import { Frame } from "arwes";
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

const Countdown = (props) => {
  const { classes, className } = props;
  return (
    <Frame animate={true} corners={1}>
      <div></div>
    </Frame>
  );
};

export default withStyles(styles)(Countdown);
