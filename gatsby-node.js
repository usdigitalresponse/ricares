const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allAirtable {
        distinct(field: id)
      }
    }
  `);
  result.data.allAirtable.distinct.forEach((node) => {
    createPage({
      path: "/reports/" + node,
      component: require.resolve("./src/templates/report.js"),
      context: { slug: node },
    });
  });
};
