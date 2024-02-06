import { Words, Frame } from "arwes";
import Training from "../../../components/world/departments/Training";
import { Helmet } from "react-helmet";

const TrainingCenter = (props) => {
  return (
    <>
      <Helmet title="Task N° 2 | AINEXIM" />
      <Frame level={2} corners={1}>
        <Words animate style={{ padding: "1em" }}>
          Training Center
        </Words>
      </Frame>
      <br></br>
      <br></br>
      <Training />
    </>
  );
};

export default TrainingCenter;
