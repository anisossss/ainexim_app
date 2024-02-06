import { Highlight, withStyles } from "arwes";
import { Frame } from "arwes";
import { Helmet } from "react-helmet";
import TimelineFrame from "../../../components/world/desktop/TimelineFrame";
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

const Timeline = (props) => {
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
      <TimelineFrame />
    </>
  );
};
export default withStyles(styles)(Timeline);
