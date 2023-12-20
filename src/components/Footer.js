import { Footer as ArwesFooter, Paragraph } from "arwes";

const Footer = () => {
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
        <Paragraph style={{ fontSize: 14 }}>AINEXIM © 2023</Paragraph>
      </div>
    </ArwesFooter>
  );
};

export default Footer;
