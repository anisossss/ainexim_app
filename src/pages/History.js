import { useMemo } from "react";
import { Appear, Table, Paragraph } from "arwes";

const History = (props) => {
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
    <article id="history">
      <Appear animate show={props.entered}>
        <Paragraph>History of current missions.</Paragraph>
        <Table animate>
          <table style={{ tableLayout: "fixed" }}>
            <thead>
              <tr>
                <th>No.</th>
                <th>Date</th>
                <th>Mission</th>
                <th>Task</th>
              </tr>
            </thead>
            <tbody style={{ color: "white" }}>
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
    </article>
  );
};

export default History;
