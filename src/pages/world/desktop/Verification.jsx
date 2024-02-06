import { withStyles } from "arwes";
import VerificationFrame from "../../../components/world/desktop/VerificationFrame";
import { Helmet } from "react-helmet";
import { Frame, Words } from "arwes";
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

const Verification = (props) => {
  const { classes, className } = props;
  return (
    <>
      <Helmet title="Task N° 2 | AINEXIM" />
      <Frame level={2} corners={1}>
        <Words animate className="words">
          Timeline
        </Words>
      </Frame>
      <br></br>
      <br></br>
      <VerificationFrame />
    </>
  );
};

export default withStyles(styles)(Verification);
