import { Words, Frame } from "arwes";
import MentorChat from "../../../components/world/mentor";
import { Helmet } from "react-helmet";

const Mentor = (props) => {
  return (
    <>
      <Helmet title="Mentorting Support | AINEXIM" />

      <MentorChat />
    </>
  );
};

export default Mentor;
