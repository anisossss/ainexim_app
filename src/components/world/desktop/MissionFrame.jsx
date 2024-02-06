import { Words, Frame } from "arwes";
import { Helmet } from "react-helmet";

const Mission = (props) => {
  return (
    <>
      <Helmet title="Mission N° 2 | AINEXIM" />
      <Frame level={2} corners={1}>
        <Words animate style={{ padding: "1em" }}>
          Mission N° 2
        </Words>
      </Frame>

    </>
  );
};

export default Mission;
