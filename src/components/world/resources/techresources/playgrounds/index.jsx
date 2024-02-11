import { withStyles } from "arwes";
import { Frame, Words } from "arwes";
const styles = () => ({
  root: {},
  "@media (max-width: 800px)": {
    root: {
      margin: "0 12px",
    },
  },
});

const PlaygroundsFrame = (props) => {
  const { classes, className } = props;
  return (
    <Frame animate={true}>
      <Words animate className="words">
        Playgrounds
      </Words>
    </Frame>
  );
};

export default withStyles(styles)(PlaygroundsFrame);
