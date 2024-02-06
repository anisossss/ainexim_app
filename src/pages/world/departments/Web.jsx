import { Words, Frame } from "arwes";
import Web from "../../../components/world/departments/Web";
import { Helmet } from "react-helmet";

const WebDevelopmentDepartment = (props) => {
  return (
    <>
      <Helmet title="Task N° 2 | AINEXIM" />
      <Frame level={2} corners={1}>
        <Words animate style={{ padding: "1em" }}>
          Web Development Department
        </Words>
      </Frame>
      <br></br>
      <br></br>
      <Web />
    </>
  );
};

export default WebDevelopmentDepartment;
