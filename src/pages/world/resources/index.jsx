import { Words, Frame } from "arwes";
import TechResourcesFrame from "../../../components/world/techresources";
import { Helmet } from "react-helmet";

const TechResources = (props) => {
  return (
    <>
      <Helmet title="Tech Resources | AINEXIM" />
      <Frame level={2} corners={1}>
        <Words animate className="words">
          Tech Resources
        </Words>
      </Frame>
      <br></br>
      <TechResourcesFrame />
    </>
  );
};

export default TechResources;
