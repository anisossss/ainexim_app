import { Words, Frame } from "arwes";
import OpenJobsTable from "../../components/tables/OpenJobsTable";
import { Helmet } from "react-helmet";

const OpenJobs = (props) => {
  return (
    <>
      <Helmet title="Task N° 2 | AINEXIM" />
      <Frame level={2} corners={1}>
        <Words animate style={{ padding: "1em" }}>
          Open Jobs 🔔
        </Words>
      </Frame>
      <br></br>
      <br></br>
      <div>
        <OpenJobsTable />
      </div>
    </>
  );
};

export default OpenJobs;
