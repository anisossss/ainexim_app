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
        <Words>Are you sure you want to Validate the Quiz?</Words>
        <br />
        <br />
        <div className="btns_confirm">
          <Link animate href="/preworld/test">
            <Button>Confirm</Button>
          </Link>

          <Button onClick={handleCloseModal}>Cancel</Button>
        </div>
      </div>
    </Frame>
  );
};

export default withStyles(styles)(ApplyFrame);
