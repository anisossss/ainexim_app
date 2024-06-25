import { Words, Frame } from "arwes";
import { Helmet } from "react-helmet";
import MeetingRoom from "../../../../components/world/departments/meeting/MeetingRoom";

const Meeting = (props) => {
  return (
    <>
      <Helmet title="Meeting Room | AINEXIM" />
      <Frame level={2} corners={1}>
        <Words animate style={{ padding: "1em" }}>
          Meeting Room
        </Words>
      </Frame>
      <br></br>
      <MeetingRoom />
    </>
  );
};

export default Meeting;
