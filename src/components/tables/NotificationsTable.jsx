import React from "react";
import { Table, withStyles } from "arwes";

const styles = (theme) => ({});

const NotificationsTable = (props) => {
  const staticTasks = [
    {
      id: 1,
      title:
        "Great job team! We just completed the landing page graphics design.",
    },
    {
      id: 2,
      title:
        "Reminder: Please review and provide feedback on the homepage layout draft by EOD today.",
    },
    {
      id: 3,
      title:
        "Congratulations everyone! The website has been successfully deployed to the production server.",
    },
    {
      id: 4,
      title:
        "Team meeting tomorrow at 10 AM to discuss the optimization of database queries.",
    },
    {
      id: 5,
      title:
        "Well done team! The client-side form validation has been implemented and is ready for testing.",
    },
  ];

  return (
    <Table className="table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {staticTasks.map((rowData) => (
            <tr key={rowData.id}>
              <td>{rowData.id}</td>
              <td>{rowData.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Table>
  );
};

export default withStyles(styles)(NotificationsTable);
