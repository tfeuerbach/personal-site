/** @jsx jsx */
import { graphql, HeadFC, PageProps } from "gatsby"
import * as React from "react"
import { jsx, Heading } from "theme-ui"
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout"
import ItemTags from "../@lekoarts/gatsby-theme-minimal-blog/components/item-tags"

const PostTemplate = ({ data }) => {
  const { html } = data.markdownRemark
  const px = [`16px`, `8px`, `4px`]
  const shadow = px.map((v) => `rgba(0, 0, 0, 0.1) 0px ${v} ${v} 0px`)
  return (
    <Layout>
    <Heading as="h2" variant="styles.h2">
      {data.title}
    </Heading>
    <p sx={{ color: `secondary`, mt: 3, a: { color: `secondary` }, fontSize: [1, 1, 2] }}>
      <time>{data.date}</time>
      {data.tags && (
        <React.Fragment>
          {` — `}
          <ItemTags tags={data.tags} />
        </React.Fragment>
      )}
      {data.timeToRead && ` — `}
      {data.timeToRead && <span>{data.timeToRead} min read</span>}
    </p>
    <section
      sx={{
        my: 5,
        ".gatsby-resp-image-wrapper": {
          my: [4, 4, 5],
          borderRadius: `4px`,
          boxShadow: shadow.join(`, `),
          ".gatsby-resp-image-image": {
            borderRadius: `4px`,
          },
        },
        variant: `layout.content`,
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  </Layout>
)  
}

export default PostTemplate
