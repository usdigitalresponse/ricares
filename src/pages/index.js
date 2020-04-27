import React from "react";
import Layout from "../components/layout";
import { Link, graphql } from "gatsby";
import DataTable from "react-data-table-component";

const IndexPage = ({ data }) => {
  const nodes = data.allAirtable.nodes.map((row) => ({
    id: row.id,
    request: row.data.Number_Request,
    agency: row.data.State_Agency,
    program: row.data.State_COVID_Program_Name,
  }));

  return (
    <Layout>
      <h1>Current Funding Requests</h1>
      <DataTable data={nodes} columns={columns} noHeader={true} />
      <small>Last updated at: {data.siteBuildMetadata.buildTime}</small>
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
          State_Agency
        }
      }
    }
    siteBuildMetadata {
      buildTime(formatString: "MMMM DD YYYY, hh:mm a", locale: "en-US")
    }
  }
`;

const columns = [
  {
    name: "Request Number",
    selector: "id",
    cell: (row) => <Link to={`/reports/${row.id}`}>{row.request}</Link>,
    width: "15%",
    sortable: true,
  },
  {
    name: "Program",
    selector: "program",
    sortable: true,
  },
  {
    name: "Agency",
    selector: "agency",
    sortable: true,
  },
];

export default IndexPage;
