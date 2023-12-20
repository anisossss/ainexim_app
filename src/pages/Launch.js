import React from "react";
import { Appear, Button, Loading, Paragraph } from "arwes";
import Clickable from "../components/Clickable";

const Launch = (props) => {
  return (
    <Appear id="subscribe" animate show={props.entered}>
      <Paragraph>
        Welcome to the Virtual Work Experience for AINEXIM.
        <br></br>Please fill in the details below to start your virtual working
        journey.
      </Paragraph>
      <br></br>
      <form
        onSubmit={props.submitApplication}
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

        <Clickable>
          <Button
            animate
            show={props.entered}
            type="submit"
            layer="success"
            disabled={props.isSubmitting}
            style={{ marginTop: "1em" }}
          >
            Apply for Virtual Work Experience ✔
          </Button>
        </Clickable>
        {props.isSubmitting && <Loading animate small />}
      </form>
    </Appear>
  );
};

export default Launch;
