import { withStyles } from "arwes";
import VerificationFrame from "../../../../../components/world/web/desktop/tasks/dev/VerificationFrame";
import { Helmet } from "react-helmet";
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
      <Helmet title="Task Validation | AINEXIM" />

      <VerificationFrame />
    </>
  );
};

export default withStyles(styles)(Verification);
