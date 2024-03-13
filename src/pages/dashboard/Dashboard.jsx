import React from "react";
import { Appear, Frame, Row, Col, Words } from "arwes";
import ActiveHours from "../../components/dashboard/ActiveHours";
import CurrentTasksTable from "../../components/tables/CurrentTasksTable";
import PersonalChat from "../../components/dashboard/PersonalChat";
import TeamChat from "../../components/dashboard/TeamChat";
import { Helmet } from "react-helmet";

const WelcomeCard = () => (
  <Frame level={2} corners={1}>
    <Words animate style={{ height: "4em", padding: "1.2em" }}>
      Hello Anis, your current task is : #AX01 Create homepage layout
    </Words>
  </Frame>
);

const DashboardCard = ({ children, title }) => (
  <Frame className="dashboard_card">
    <h2
      style={{
        marginBottom: "1rem",
        textAlign: "center",
      }}
    >
      {title}
    </h2>
    {children}
  </Frame>
);

const Dashboard = (props) => {
  return (
    <>
      <Helmet title="Task N° 2 | AINEXIM" />
      <Appear animate show={props.entered} className="dashboard_container">
        <Row>
          <Col l={12}>
            <WelcomeCard />
          </Col>
        </Row>
        <Row>
          <Col s={12} l={6}>
            <DashboardCard title="Current Tasks">
              <CurrentTasksTable />
            </DashboardCard>
          </Col>
          <Col s={12} l={6}>
            <DashboardCard title="Active Hours">
              <ActiveHours />
            </DashboardCard>
          </Col>

          <Col s={12} l={6}>
            <DashboardCard title="Personal Chat">
              <PersonalChat />
            </DashboardCard>
          </Col>
          <Col s={12} l={6}>
            <DashboardCard title="Team Chat">
              <TeamChat />
            </DashboardCard>
          </Col>
        </Row>
      </Appear>{" "}
    </>
  );
};

export default Dashboard;
