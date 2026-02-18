exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }
    type MdxFrontmatter {
      image: String
    }
    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
    }
    type MarkdownRemarkFrontmatter {
      image_external: String
    }
  `
  createTypes(typeDefs)
}
