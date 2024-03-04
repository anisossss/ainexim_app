import { withStyles } from "arwes";

import GithubTaskFrame from "../../../components/world/desktop/GithubTaskFrame";
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

const GithubTask = (props) => {
  const { classes, className } = props;
  return (
    <>
      <Helmet title="Github Repository Check | AINEXIM" />
      <GithubTaskFrame />
    </>
  );
};

export default withStyles(styles)(GithubTask);
