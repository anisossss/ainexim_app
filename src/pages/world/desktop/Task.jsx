import { withStyles } from "arwes";

import { Words, Frame } from "arwes";
import TaskFrame from "../../../components/world/desktop/TaskFrame";
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

const Task = (props) => {
  const { classes, className } = props;
  return (
    <>
      <Helmet title="Task N° 2 | AINEXIM" />
      <TaskFrame />
    </>
  );
};

export default withStyles(styles)(Task);
