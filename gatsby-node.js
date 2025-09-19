exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Post implements Node {
      title: String!
      date: Date! @dateformat
      tags: [String]
      description: String
      canonicalUrl: String
      excerpt: String
      timeToRead: Int
      slug: String!
      image: String
      banner: File @fileByRelativePath
    }
  `
  createTypes(typeDefs)
}
