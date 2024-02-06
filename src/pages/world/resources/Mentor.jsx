import { Words, Frame } from "arwes";
import MentorChat from "../../../components/world/resources/Mentor";
import { Helmet } from "react-helmet";

const Mentor = (props) => {
  return (
    <>
      <Helmet title="Task N° 2 | AINEXIM" />

      <MentorChat />
    </>
  );
};

export default Mentor;
