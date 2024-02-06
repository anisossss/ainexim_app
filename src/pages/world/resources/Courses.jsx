import { Words, Frame } from "arwes";
import MentorChat from "../../../components/world/resources/MentorChat";
import { Helmet } from "react-helmet";

const Courses = (props) => {
  return (
    <>
      <Helmet title="Task N° 2 | AINEXIM" />
      <Frame level={2} corners={1}>
        <Words animate className="words">
          Web Development Courses
        </Words>
      </Frame>
      <br></br>
      <MentorChat />
    </>
  );
};

export default Courses;
