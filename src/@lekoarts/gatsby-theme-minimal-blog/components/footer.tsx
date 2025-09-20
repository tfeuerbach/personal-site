/** @jsx jsx */
import { jsx, Link } from "theme-ui"
import useSiteMetadata from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-site-metadata"

const Footer = () => {
  const { author } = useSiteMetadata()

  return (
    <footer
      sx={{
        boxSizing: `border-box`,
        display: `flex`,
        justifyContent: `space-between`,
        mt: [6],
        color: `secondary`,
        a: {
          variant: `links.secondary`,
        },
        flexDirection: [`column`, `column`, `row`],
        variant: `dividers.top`,
      }}
    >
      <div>
        &copy; {new Date().getFullYear()} by {author}. All rights reserved.
      </div>
      <div>
        <button
          type="button"
          aria-label="Link to the Buy Me a Coffee page"
          onClick={() => {
            const width = 600
            const height = 800
            const left = window.screen.width / 2 - width / 2
            const top = window.screen.height / 2 - height / 2
            window.open(
              `https://www.buymeacoffee.com/tfeuerbach`,
              `buymeacoffee`,
              `width=${width},height=${height},top=${top},left=${left}`
            )
          }}
          sx={{
            border: `1px solid`,
            borderColor: `divide`,
            borderRadius: `4px`,
            px: 3,
            py: 1,
            mr: 3,
            color: `text`,
            textDecoration: `none`,
            backgroundColor: `background`,
            "&:hover": {
              backgroundColor: `muted`,
              color: `text`,
              textDecoration: `none`,
            },
            cursor: `pointer`,
            fontFamily: `body`,
            fontSize: `1em`,
          }}
        >
          Buy me a coffee
        </button>
        <Link
          aria-label="Link to the theme's GitHub repository"
          href="https://github.com/tfeuerbach/personal_site"
        >
          GitHub
        </Link>
      </div>
    </footer>
  )
}

export default Footer
