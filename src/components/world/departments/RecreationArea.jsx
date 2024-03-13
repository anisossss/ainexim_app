import { Highlight, withStyles } from "arwes";
import { Frame } from "arwes";
const styles = () => ({
  root: {
    width: "1000",
    height: "63vh",
  },
  "@media (max-width: 800px)": {
    root: {
      margin: "0 12px",
    },
  },
  frame: {
    width: "100%",
    margin: "auto",
    height: "65vh",
  },
});

const RecreationArea = (props) => {
  const { classes, className } = props;
  return (
    <Frame animate={true} className={classes.root}>
      <div>
        <iframe
          src="https://fritz.chessbase.com"
          className={classes.frame}
        ></iframe>
      </div>
    </Frame>
  );
};

export default withStyles(styles)(RecreationArea);
