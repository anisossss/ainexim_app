import { withStyles } from "arwes";
import { Helmet } from "react-helmet";
import ApplyFrame from "../../../components/preworld/webcareers/ApplyFrame";
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
  return (
    <>
      <Helmet title="Job Application | AINEXIM" />
      <ApplyFrame />
    </>
  );
};

export default withStyles(styles)(Apply);
