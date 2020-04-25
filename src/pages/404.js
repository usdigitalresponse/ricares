import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
export default () => (
  <Layout>
    <h1>Nothing to see here, folks...</h1>
    <p>
      Somehow, you've found a broken link. It's probably a good idea to just{" "}
      <Link to="/">start over</Link>.
    </p>
  </Layout>
);
