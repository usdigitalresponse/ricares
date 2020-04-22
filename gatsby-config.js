require("dotenv").config();

const {
  AIRTABLE_API_KEY,
  AIRTABLE_BASE_ID,
  AIRTABLE_TABLE_NAME,
  AIRTABLE_TABLE_VIEW,
} = process.env;

module.exports = {
  // In gatsby-config.js
  plugins: [
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: AIRTABLE_API_KEY,
        concurrency: 5, // default, see using markdown and attachments for more information
        tables: [
          {
            baseId: AIRTABLE_BASE_ID,
            tableName: AIRTABLE_TABLE_NAME,
            tableView: AIRTABLE_TABLE_VIEW,
          },
        ],
      },
    },
  ],
};
