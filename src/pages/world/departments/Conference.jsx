import { Words, Frame } from "arwes";
import { Helmet } from "react-helmet";
import ConferenceRoom from "../../../components/world/departments/ConferenceRoom";

const Conference = (props) => {
  return (
    <>
      <Helmet title="Task N° 2 | AINEXIM" />
      <Frame level={2} corners={1}>
        <Words animate style={{ padding: "1em" }}>
          Conference Room
        </Words>
      </Frame>
      <br></br>
      <br></br>
      <ConferenceRoom />
    </>
  );
};

export default Conference;
