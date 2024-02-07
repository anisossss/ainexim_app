import { Words, Frame } from "arwes";
import TeamChat from "../../components/dashboard/TeamChat";
import PersonalChat from "../../components/dashboard/PersonalChat";
import { Helmet } from "react-helmet";

const Chat = () => {
  return (
    <>
      <Helmet title="Task N° 2 | AINEXIM" />
      <Frame level={2} corners={1}>
        <Words animate style={{ padding: "1em" }}>
          All Messages
        </Words>
      </Frame>
      <br></br>
      <br></br>
      <div style={{}}>
        <TeamChat />
        <br></br>
        <PersonalChat />
      </div>
    </>
  );
};

export default Chat;
