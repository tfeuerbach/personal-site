exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = require.resolve(`./src/templates/blog-post.tsx`)

  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            id
            html
            frontmatter {
              title
              description
              tags
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `/blog/${node.id}`,
      component: blogPostTemplate,
      context: {
        title: node.frontmatter.title,
        description: node.frontmatter.description,
        html: node.html,
        tags: node.frontmatter.tags,
      },
    })
  })
}
