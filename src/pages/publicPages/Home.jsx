import { Helmet } from "react-helmet";
import React from "react";
import IndexHome from "../../components/publicComp/home/IndexHome";
const Home = (props) => {
  return (
    <>
      <Helmet title="AINEXIM | Home" />
      <IndexHome />
    </>
  );
};

export default Home;
