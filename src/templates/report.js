import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
const printJS = typeof window !== `undefined` ? require("print-js") : null;

export default ({ data }) => {
  const report = data.airtable.data;
  return (
    <Layout>
      <div>
        <Link to="/">
          <p className="navigation">
            <img src={"/back-icon.svg"} height="16" alt="Back Arrow Icon" />{" "}
            Back
          </p>
        </Link>
        <button className="pdf-button" type="button" onClick={handleClick}>
          Print to PDF&nbsp;
          <img
            className="pdf-button-img"
            src={"/pdf.svg"}
            height="32"
            alt="Print to PDF"
          />
        </button>
        <ReportContent report={report} />
      </div>
    </Layout>
  );
};

const handleClick = (e) => {
  e.preventDefault();
  printJS({
    printable: "reportContent",
    type: "html",
    style:
      "dt { font-weight: bold; } .coat-of-arms { display: block; margin: 2rem auto;}",
  });
};

export const query = graphql`
  query($slug: String!) {
    airtable(id: { eq: $slug }) {
      data {
        Primary_Key
        State_Agency
        Name_of_Program_Lead
        Federal_COVID_Program_Name
        State_COVID_Program_Name
        State_COVID_Program_Description
        COVID_Act_Under_Which_Award_is_Funded
        Specify_the_COVID_Program_Funding_Source_Title_and_Section
        Federal_Funding_Agency
        Federal_Award_Identification_Number__FAIN_
        Assistance_Listing_Number__CFDA_
        Unique_Entity_Identifier__DUNS_Number_
        COVID_Funding_Scenario
        COVID_Program_Funding_Purpose
        Program_Type
        Funding_Type
        Date_Guidance_Issued
        Link_to_Program_Guidance
        Funding_Amount
        Match_Required
        Match_Amount
        Maintenance_of_Effort
        Maintenance_of_Effort_Statutory_Provision
        Sustainability___Does_the_award_require_the_state_to_continue_to_fund_and_deliver_program_services_after_the_federal_award_ends_
        Number_of_FTEs_to_Implement_Award
        Number_of_Existing_FTEs_Assigned_to_Work_on_the_Award
        Number_of_New_FTEs_to_be_Hired_to_Implement_the_Award
        Number_of_Contract_Employees_to_Implement_Award
        Number_of_Existing_Contract_Employees_Assigned_to_Work_on_Award
        Number_of_New_Contract_Employees_to_be_Hired_to_Implement_Award
        Indirect_Cost_Allowed
        Administration_Cost_Limitation
        Other_Provisions__Restrictions_or_Limitations_on_Funding
        Pre_Award_Costs_Allowed
        Expenditure_Eligibility_Begin_Date
        Expenditure_Eligibility_End_Date
        Date_s__by_Which_Funds_Must_be_Obligated
        Certifications__Assurances_Required
        Requirement_to_Pass_Through_Funds_to_Subrecipients
        Designated_Subrecipient_Types
        Percent_of_Award_to_be_Issued_as_Subawards
        Financial_Reporting_Requirements
        Programmatic_Reporting_Requirements
        Date
        Award_Instrument_Type
        Date_Application__Plan__or_Formal_Request_is_Due
        Type_or_Description_of_Certification_and_Assurance
        Additional_Information
      }
    }
  }
`;

const ReportContent = ({ report }) => (
  <div id="reportContent">
    <img
      className="coat-of-arms"
      src="/state-coa.png"
      height="100px"
      alt="State Coat of Arms"
    />
    <h1>Request for Authorization to Spend COVID Award</h1>
    <h2>{report.Primary_Key}</h2>
    <dl>
      <dt>Date Requested</dt>
      <dd>{report.Date}</dd>

      <dt>Agency</dt>
      <dd>{report.State_Agency}</dd>

      <dt>State Program</dt>
      <dd>{report.State_COVID_Program_Name}</dd>

      <dt>State COVID Program Funding Purpose</dt>
      <dd>{report.COVID_Program_Funding_Purpose}</dd>

      <dt>Funding Type</dt>
      <dd>{report.Funding_Type}</dd>

      <dt>Total Funding Amount</dt>
      <dd>$ {report.Funding_Amount.toLocaleString()}</dd>

      <dt>Match Amount</dt>
      <dd>{report.Match_Amount}</dd>

      <dt>Number of New FTEs to be Hired</dt>
      <dd>{report.Number_of_New_FTEs_to_be_Hired_to_Implement_the_Award}</dd>

      <dt>Number of New Contract Employees to be Hired</dt>
      <dd>
        {report.Number_of_New_Contract_Employees_to_be_Hired_to_Implement_Award}
      </dd>

      <dt>Maintenance of Effort Statutory Provision</dt>
      <dd>{report.Maintenance_of_Effort_Statutory_Provision}</dd>

      <dt>Statutory Changes Needed</dt>
      <dd>{report.Describe_any_Statutory_Changes_Needed}</dd>

      <dt>Regulatory Changes Needed</dt>
      <dd>{report.Describe_any_Regulatory_Changes_Needed}</dd>

      <dt>Expenditure Begin Date</dt>
      <dd>{report.Expenditure_Eligibility_Begin_Date}</dd>

      <dt>Expenditure End Date</dt>
      <dd>{report.Expenditure_Eligibility_End_Date}</dd>
    </dl>
  </div>
);
