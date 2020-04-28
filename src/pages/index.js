import React from "react";
import Layout from "../components/layout";
import { Link, graphql } from "gatsby";
import DataTable from "react-data-table-component";
const moment = require("moment-timezone");

const FilterOptions = ({ agencies, currentAgency, setCurrentAgency }) => {
  const handleOnChange = (event) => {
    if (event.target.value === "no agency") {
      setCurrentAgency(null);
    } else {
      setCurrentAgency(event.target.value);
    }
  };
  const options = agencies.map((agency) => (
    <option value={agency}>{agency}</option>
  ));
  let selectValue = currentAgency;
  if (selectValue === null) {
    selectValue = "no agency";
  }
  return (
    <select value={selectValue} onChange={handleOnChange}>
      <option value="no agency">Viewing All Agencies</option>
      <option disabled>-----------------</option>
      {options}
    </select>
  );
};

const IndexPage = ({ data }) => {
  const [currentAgency, setCurrentAgency] = React.useState(null);
  const nodes = data.allAirtable.nodes.map((row) => ({
    id: row.id,
    request: row.data.Primary_Key,
    agency: row.data.State_Agency,
    program: row.data.State_COVID_Program_Name,
  }));
  const filteredNodes = nodes.filter(
    (node) => currentAgency === null || currentAgency === node.agency
  );
  let agencies = {};
  nodes.forEach((node) => {
    agencies[node.agency] = true;
  });
  const buildTime = moment(data.siteBuildMetadata.buildTime)
    .utc(true)
    .tz("America/New_York")
    .format("LLL");

  return (
    <Layout>
      <h1>Current Funding Requests</h1>
      <FilterOptions
        agencies={Object.keys(agencies)}
        currentAgency={currentAgency}
        setCurrentAgency={setCurrentAgency}
      />
      <DataTable data={filteredNodes} columns={columns} noHeader={true} />
      <small>Last updated at: {buildTime}</small>
    </Layout>
  );
};

export const query = graphql`
  query {
    allAirtable {
      nodes {
        id
        data {
          Primary_Key
          State_COVID_Program_Name
          State_Agency
        }
      }
    }
    siteBuildMetadata {
      buildTime(formatString: "LLL", locale: "en-US")
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
