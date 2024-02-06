import { Footer as ArwesFooter, Paragraph } from "arwes";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear());

  return (
    <ArwesFooter animate>
      <div
        style={{
          textAlign: "center",
          margin: "1em",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paragraph style={{ fontSize: 14 }}>AINEXIM © {currentYear}</Paragraph>
      </div>
    </ArwesFooter>
  );
};

export default Footer;
