import { Words, Frame } from "arwes";
import MentorChat from "../../../components/world/resources/Mentor";
import { Helmet } from "react-helmet";

const Mentor = (props) => {
  return (
    <>
      <Helmet title="Task N° 2 | AINEXIM" />
      <Frame level={2} corners={1}>
        <Words animate className="words">
          Mentor Chat
        </Words>
      </Frame>
      <br></br>
      <MentorChat />
    </>
  );
};

export default Mentor;
