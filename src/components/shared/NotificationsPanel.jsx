import { Highlight, withStyles } from "arwes";
import { Frame } from "arwes";
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

const NotificationsPanel = (props) => {
  const { classes, className } = props;
  return (
    <Frame
      animate={true}
      corners={1}
      style={{
        position: "fixed",
        top: "50px",
        right: "10px",
        zIndex: 1000,
        width: "20%",
      }}
    >
      <Highlight>
        <p>Notification 1</p>
        <p>Notification 2</p>
      </Highlight>
    </Frame>
  );
};

export default withStyles(styles)(NotificationsPanel);
