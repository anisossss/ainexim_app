import { Words, Frame } from "arwes";
import RecreationArea from "../../../../components/world/departments/recreation";
import { Helmet } from "react-helmet";

const Recreation = (props) => {
  return (
    <>
      <Helmet title="Task N° 2 | AINEXIM" />
      <Frame level={2} corners={1}>
        <Words animate style={{ padding: "1em" }}>
          Recreation Area
        </Words>
      </Frame>
      <br></br>
      <RecreationArea />
    </>
  );
};

export default Recreation;
