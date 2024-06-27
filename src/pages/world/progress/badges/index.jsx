import { Highlight, withStyles } from "arwes";
import BadgesFrame from "../../../../components/world/web/progress/badges";
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

const Badges = (props) => {
  const { classes, className } = props;
  return (
    <>
      <Helmet title="Task N° 2 | AINEXIM" />
      <Frame level={2} corners={1}>
        <Words animate className="words">
          My Badges
        </Words>
      </Frame>
      <br></br>
      <BadgesFrame />
    </>
  );
};

export default withStyles(styles)(Badges);
