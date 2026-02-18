/** @jsx jsx */
import { jsx, Heading, Flex } from "theme-ui"
import type { HeadFC } from "gatsby"
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout"
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo"
import ProjectGrid from "../@lekoarts/gatsby-theme-minimal-blog/components/project-grid"

const ProjectsPage = () => (
  <Layout>
    <Flex sx={{ alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap` }}>
      <Heading as="h1" variant="styles.h1" sx={{ marginY: 2 }}>
        Projects
      </Heading>
    </Flex>
    <ProjectGrid />
  </Layout>
)

export default ProjectsPage

export const Head: HeadFC = () => <Seo title="Projects" />
