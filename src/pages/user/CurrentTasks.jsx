import { Words, Frame } from "arwes";
import CurrentTasksTable from "../../components/tables/CurrentTasksTable";
import { Helmet } from "react-helmet";

const CurrentTasks = (props) => {
  return (
    <>
      <Helmet title="Task N° 2 | AINEXIM" />
      <Frame level={2} corners={1}>
        <Words animate style={{ padding: "1em" }}>
          Your Current Tasks
        </Words>
      </Frame>
      <br></br>
      <br></br>
      <CurrentTasksTable />
    </>
  );
};

export default CurrentTasks;
