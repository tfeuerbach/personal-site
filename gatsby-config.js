require(`dotenv`).config();

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;

/**
 * @type {import('gatsby').GatsbyConfig}
 */

module.exports = {
  siteMetadata: {
    siteTitle: `tfeuerbach.dev`,
    siteTitleAlt: `tfeuerbach - Personal Site`,
    siteHeadline: `Thomas Feuerbach's Blog`,
    siteUrl: `https://tfeuerbach.dev`,
    siteDescription: `Thomas Feuerbach's personal website for programming, projects, and interesting things.`,
    siteImage: `/banner.jpg`,
    siteLanguage: `en`,
    author: `Thomas Feuerbach`,
  },
  trailingSlash: `always`,
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-decap-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`, // Customize Decap CMS if needed
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/content/projects`,
      },
    },
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`,
      options: {
        navigation: [
          { title: `Posts`, slug: `/blog` },
          { title: `Projects`, slug: `/projects` },
          { title: `Resume`, slug: `/resume` },
          { title: `About`, slug: `/about` },
        ],
        externalLinks: [
          { name: `LinkedIn`, url: `https://linkedin.com/in/tfeuerbach` },
          { name: `YouTube`, url: `https://youtube.com/@tfeuerbach` },
	  { name: `Photography`, url: `https://photos.tfeuerbach.dev/`},
          { name: `RSS`, url: `/rss.xml` },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: { footnotes: true },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: { output: `/` },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `tfeuerbach - Thomas Feuerbach's Personal Page`,
        short_name: `tfeuerbach`,
        description: `Thomas Feuerbach's personal website for programming, projects, and interesting things.`,
        start_url: `/`,
        background_color: `#fff`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title: siteTitle
                description: siteDescription
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allPost } }) =>
              allPost.nodes.map((post) => {
                const url = site.siteMetadata.siteUrl + post.slug;
                const content = `<p>${post.excerpt}</p><div style="margin-top: 50px; font-style: italic;"><strong><a href="${url}">Keep reading</a>.</strong></div><br /> <br />`;

                return {
                  title: post.title,
                  date: post.date,
                  excerpt: post.excerpt,
                  url,
                  guid: url,
                  custom_elements: [{ "content:encoded": content }],
                };
              }),
            query: `{
              allPost(sort: {date: DESC}) {
                nodes {
                  title
                  date(formatString: "MMMM D, YYYY")
                  excerpt
                  slug
                }
              }
            }`,
            output: `rss.xml`,
            title: `tfeuerbach.dev`,
          },
        ],
      },
    },
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
};
