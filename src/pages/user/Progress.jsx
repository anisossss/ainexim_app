import { Appear, Table, Paragraph } from "arwes";
import { Helmet } from "react-helmet";
const Progress = (props) => {

  return (
    <>
      <Helmet title="Overall Progress | AINEXIM" />
      <Appear animate show={props.entered}>
        <Paragraph>History of</Paragraph>
      
      </Appear>
    </>
  );
};

export default Progress;
