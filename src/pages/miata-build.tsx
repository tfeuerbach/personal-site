/** @jsx jsx */
import { jsx } from "theme-ui"
import type { HeadFC } from "gatsby"
import Layout from "../@lekoarts/gatsby-theme-minimal-blog/components/layout"
import Seo from "../@lekoarts/gatsby-theme-minimal-blog/components/seo"
import MiataBuildSheet from "../components/miata-build/MiataBuildSheet"

const MiataBuildPage = () => (
  <Layout>
    <MiataBuildSheet />
  </Layout>
)

export default MiataBuildPage

export const Head: HeadFC = () => (
  <Seo title="Miata Build" description="2008 Mazda MX-5 NC1 track build sheet — parts, costs, and estimated power.">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link
      href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
  </Seo>
)
