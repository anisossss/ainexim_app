import React from "react";
import { Appear, Button, Loading, Paragraph } from "arwes";
import { Link } from "react-router-dom";
import Clickable from "../Clickable";
const IndexHome = (props) => {
  return (
    <>
      <Appear id="subscribe" animate show={props.entered}>
        <Paragraph>
          Welcome to the Virtual Work Experience for AINEXIM.
          <br></br>Please fill in the details below to start your virtual
          working journey.
        </Paragraph>
        <br></br>
        <div
          style={{
            display: "inline-grid",
            gridTemplateColumns: "auto auto",
            gridGap: "10px 20px",
          }}
        >
          <label htmlFor="full-name">Full Name</label>
          <input type="text" id="full-name" name="full-name" />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />

          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" />

          <label htmlFor="skills">Skills</label>
          <input type="text" id="skills" name="skills" />

          <label htmlFor="desired-role">Desired Role</label>
          <input type="text" id="desired-role" name="desired-role" />

          <Link to="/preworld/quiz">
            <Button
              animate
              show={props.entered}
              layer="success"
              style={{ marginTop: "1em" }}
            >
              Start your journey
            </Button>
          </Link>
          {/* {props.isSubmitting && <Loading animate small />} */}
        </div>
      </Appear>
    </>
  );
};

export default IndexHome;
