import { withStyles } from "arwes";

import ChatPanel from "../../../components/world/web/chat/ChatPanel";
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

const Chat = (props) => {
  const { classes, className } = props;
  return (
    <>
      <Helmet title="Task N° 1 | AINEXIM" />
      <ChatPanel />
    </>
  );
};

export default withStyles(styles)(Chat);
