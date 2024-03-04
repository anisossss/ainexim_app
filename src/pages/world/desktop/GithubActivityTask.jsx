import { withStyles } from "arwes";
import { Words, Frame } from "arwes";
import GithubActivityTaskFrame from "../../../components/world/desktop/GithubActivityTaskFrame";
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

const GithubActivityTask = (props) => {
  const { classes, className } = props;
  return (
    <>
      <Helmet title="Github Activity Check | AINEXIM" />
      <GithubActivityTaskFrame />
    </>
  );
};

export default withStyles(styles)(GithubActivityTask);
