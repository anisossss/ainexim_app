import { withStyles } from "arwes";
import { Frame, Words } from "arwes";
const styles = () => ({
  root: {
    width: 1200,
  },
  "@media (max-width: 800px)": {
    root: {
      margin: "0 12px",
    },
  },
});

const CastsFrame = (props) => {
  const { classes, className } = props;
  return (
    <Frame animate={true}>
      <Words animate className="words">
        Casts
      </Words>
    </Frame>
  );
};

export default withStyles(styles)(CastsFrame);
