import React from "react";
import Layout from "../components/layout";
import { Link, graphql } from "gatsby";

const IndexPage = ({ data }) => {
  const nodes = data.allAirtable.nodes;
  return (
    <Layout>
      <h1>Current Funding Requests</h1>
      <ul>
        {nodes.map((d) => (
          <li key={d.id}>
            <Link to={`/reports/${d.id}`}>{d.data.Number_Request}</Link>{" "}
            <small>{d.data.State_COVID_Program_Name}</small>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query {
    allAirtable {
      nodes {
        id
        data {
          Number_Request
          State_COVID_Program_Name
        }
      }
    }
  }
`;

export default IndexPage;
