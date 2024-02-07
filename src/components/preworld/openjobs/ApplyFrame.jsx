import React, { useState, useEffect, useMemo } from "react";
import { withStyles } from "arwes";
import { Frame, Button, Words, Link } from "arwes";
import axios from "axios";
import { CONSTANTS } from "../../../constants/api";
const styles = () => ({
  "@media (max-width: 800px)": {
    root: {
      margin: "0 12px",
    },
  },
});
const ApplyFrame = (props) => {
  const { classes, className } = props;

  return (
    <Frame className={classes.modalFrame} animate={true} corners={1}>
      <div style={{ padding: "1em" }}>
        <Words>Apply for Frontend Developer job</Words>
        <br />
        <br />
        <Words>Upload your resume and a cover letter</Words>

        <br />
        <br />
        <div className="btns_confirm">
          <Button>Cancel</Button>
          <Link animate href="/dashboard">
            <Button>Confirm</Button>
          </Link>
        </div>
      </div>
    </Frame>
  );
};

export default withStyles(styles)(ApplyFrame);
