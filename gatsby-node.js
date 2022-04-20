exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allContentfulMoodsCollection {
        nodes {
          slug
          mood {
            slug
          }
        }
      }
      allContentfulPublication {
        nodes {
          slug
        }
      }
    }
  `);
  data.allContentfulPublication.nodes.forEach((node) => {
    const slug = node.slug;
    actions.createPage({
      path: `catalogue/${slug}`,
      component: require.resolve(`./src/templates/Publication.js`),
      context: { slug: slug },
    });
  });
  data.allContentfulMoodsCollection.nodes.forEach((node) => {
    const collectionSlug = node.slug;
    actions.createPage({
      path: `catalogue/moods/${collectionSlug}`,
      component: require.resolve(`./src/templates/MoodsCollection.js`),
      context: { slug: collectionSlug },
    });
    node.mood.forEach((innerNode) => {
      const moodSlug = innerNode.slug;
      actions.createPage({
        path: `catalogue/moods/${collectionSlug}/${moodSlug}`,
        component: require.resolve(`./src/templates/Mood.js`),
        context: { slug: moodSlug },
      });
    });
  });
};
