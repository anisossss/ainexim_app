import { useMemo } from "react";
import { withStyles, Appear, Paragraph, Table, Words } from "arwes";

const styles = () => ({
  link: {
    color: "red",
    textDecoration: "none",
  },
});

const Upcoming = (props) => {
  const tasks = useMemo(
    () => [
      {
        number: 1,
        date: "2023-01-15",
        mission: "Project A",
        task: "Design landing page",
      },
      {
        number: 2,
        date: "2023-02-28",
        mission: "Project B",
        task: "Implement responsive layout",
      },
      {
        number: 3,
        date: "2023-03-10",
        mission: "Project C",
        task: "Create navigation menu",
      },
      {
        number: 4,
        date: "2023-04-05",
        mission: "Project D",
        task: "Optimize website performance",
      },
      {
        number: 5,
        date: "2023-05-20",
        mission: "Project E",
        task: "Debug and fix UI issues",
      },
    ],
    []
  );
  return (
    <Appear id="tasks" animate show={props.entered}>
      <Paragraph>Upcoming tasks</Paragraph>
      <Words animate>Here you will find your upcoming tasks.</Words>
      <br></br>
      <br></br>
      <Table animate show={props.entered}>
        <table style={{ tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Date</th>
              <th>Mission</th>
              <th>Task</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{task.date}</td>
                <td>{task.mission}</td>
                <td>{task.task}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Table>
    </Appear>
  );
};

export default withStyles(styles)(Upcoming);
