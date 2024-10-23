/** @jsx jsx */
import { jsx, Heading } from "theme-ui"
import * as React from "react"
import ItemTags from "../@lekoarts/gatsby-theme-minimal-blog/components/item-tags"
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout"
import { Helmet } from "react-helmet"

export const BlogPostTemplate = ({
  content,
  description,
  tags,
  title,
  helmet,
}) => (
  <section className="section">
    {helmet || ""}
    <div className="container content">
      <div className="columns">
        <div className="column is-10 is-offset-1">
          <Heading as="h1">{title}</Heading>
          <p>{description}</p>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          {tags && tags.length ? (
            <div style={{ marginTop: `4rem` }}>
              <Heading as="h4">Tags</Heading>
              <ItemTags tags={tags} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  </section>
);

const BlogPost = ({ pageContext }) => {
  const { title, description, html, tags } = pageContext;

  return (
    <Layout>
      <BlogPostTemplate
        content={html}
        description={description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${title}`}</title>
            <meta name="description" content={description || "Default description"} />
          </Helmet>
        }
        tags={tags}
        title={title}
      />
    </Layout>
  );
};

export default BlogPost;
