import { withStyles } from "arwes";

import { Words, Frame } from "arwes";
import CodeTaskFrame from "../../../components/world/desktop/CodeTaskFrame";
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

const CodeTask = (props) => {
  const { classes, className } = props;
  return (
    <>
      <Helmet title="Task N° 1 | AINEXIM" />
      <CodeTaskFrame />
    </>
  );
};

export default withStyles(styles)(CodeTask);
