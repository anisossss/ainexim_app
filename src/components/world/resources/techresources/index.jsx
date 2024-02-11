import { withStyles } from "arwes";
import { Frame } from "arwes";
import { Link } from "react-router-dom";
const styles = () => ({
  root: {
    width: 1200,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "20px",
  },
  "@media (max-width: 800px)": {
    root: {
      margin: "0 12px",
    },
  },
});

const TechResourcesFrame = (props) => {
  const { classes, className } = props;
  return (
    <Frame animate={true}>
      <div className={classes.root}>
        <Link to="/world/departments/training-center/tech-resources/books">
          Books
        </Link>
        <Link to="/world/departments/training-center/tech-resources/courses">
          Courses
        </Link>
        <Link to="/world/departments/training-center/tech-resources/casts">
          Casts
        </Link>
        <Link to="/world/departments/training-center/tech-resources/playgrounds">
          Playgrounds
        </Link>
        <Link to="/world/departments/training-center/tech-resources/cheatsheets">
          Cheatsheets
        </Link>
      </div>
    </Frame>
  );
};

export default withStyles(styles)(TechResourcesFrame);
