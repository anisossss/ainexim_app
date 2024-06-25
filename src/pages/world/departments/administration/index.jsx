import { Words, Frame } from "arwes";
import Admin from "../../../../components/world/departments/administration/Admin";
import { Helmet } from "react-helmet";

const Administration = (props) => {
  return (
    <>
      <Helmet title="Task N° 2 | AINEXIM" />
      <Frame level={2} corners={1}>
        <Words animate style={{ padding: "1em" }}>
          HR & Administration
        </Words>
      </Frame>
      <br></br>
      <Admin />
    </>
  );
};

export default Administration;
