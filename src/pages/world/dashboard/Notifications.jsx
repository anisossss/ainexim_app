import { Words, Frame } from "arwes";
import NotificationsTable from "../../../components/tables/NotificationsTable";
import { Helmet } from "react-helmet";

const Notifications = (props) => {
  return (
    <>
      <Helmet title="Task N° 2 | AINEXIM" />
      <Frame level={2} corners={1}>
        <Words animate style={{ padding: "1em" }}>
          All notifications
        </Words>
      </Frame>
      <br></br>
      <br></br>
      <NotificationsTable />
    </>
  );
};

export default Notifications;
