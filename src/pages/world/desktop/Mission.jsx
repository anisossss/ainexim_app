import { Highlight, withStyles } from "arwes";
import MissionFrame from "../../../components/world/desktop/MissionFrame";
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

const Mission = (props) => {
  const { classes, className } = props;
  return (
    <>
      <Helmet title="Task N° 2 | AINEXIM" />
      <Frame level={2} corners={1}>
        <Words animate className="words">
          Missions
        </Words>
      </Frame>
      <br></br>
      <br></br>
      <MissionFrame />
    </>
  );
};

export default withStyles(styles)(Mission);
