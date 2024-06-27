import { Words, withStyles, Frame } from "arwes";
import { Helmet } from "react-helmet";
import TimelineFrame from "../../../../components/world/web/progress/timeline";
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

const Timeline = () => {
  return (
    <>
      <Helmet title="Task N° 2 | AINEXIM" />
      <Frame level={2} corners={1}>
        <Words animate className="words">
          My current mission timeline
        </Words>
      </Frame>
      <br></br>
      <TimelineFrame />
    </>
  );
};
export default withStyles(styles)(Timeline);
