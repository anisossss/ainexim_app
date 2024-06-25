import { withStyles } from "arwes";
const styles = () => ({
  root: {
    width: "100%",
  },
  "@media (max-width: 800px)": {
    root: {
      margin: "0 12px",
    },
  },
  frame: {
    width: "100%",
    margin: "auto",
    height: "67vh",
  },
});

const RecreationArea = (props) => {
  const { classes } = props;
  return (
    <iframe
      src="https://fritz.chessbase.com"
      className={classes.frame}
      title="chess-game"
    ></iframe>
  );
};

export default withStyles(styles)(RecreationArea);
