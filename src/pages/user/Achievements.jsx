import AchievementsTable from "../../components/tables/AchievementsTable";
import { Words, Frame } from "arwes";
import { Helmet } from "react-helmet";

const Achievements = (props) => {
  return (
    <>
      <Helmet title="Task N° 2 | AINEXIM" />
      <Frame level={2} corners={1}>
        <Words animate style={{ padding: "1em" }}>
          Your Total Achievements
        </Words>
      </Frame>
      <br></br>
      <br></br>
      <AchievementsTable />
    </>
  );
};

export default Achievements;
