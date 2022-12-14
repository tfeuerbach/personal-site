"use strict";

require("dotenv").config();

var shouldAnalyseBundle = process.env.ANALYSE_BUNDLE;
/**
 * @type {import('gatsby').GatsbyConfig}
 */

module.exports = {
  siteMetadata: {
    siteTitle: "tfeuerbach.dev",
    siteTitleAlt: "tfeuerbach - Personal Site",
    siteHeadline: "Thomas Feuerbach's Blog",
    siteUrl: "https://tfeuerbach.dev",
    siteDescription: "Thomas Feuerbach's personal website for programming, projects, and interesting things.",
    siteImage: "/banner.jpg",
    author: "Thomas Feuerbach"
  },
  trailingSlash: "never",
  plugins: ["gatsby-plugin-netlify-cms", {
    resolve: "@lekoarts/gatsby-theme-minimal-blog",
    // See the theme's README for all available options
    options: {
      modulePath: "".concat(__dirname, "/src/cms/cms.js"),
      navigation: [{
        title: "Posts",
        slug: "/blog"
      }, {
        title: "Resume",
        slug: "/resume"
      }, {
        title: "About",
        slug: "/about"
      }],
      externalLinks: [{
        name: "LinkedIn",
        url: "https://linkedin.com/in/tfeuerbach"
      }, {
        name: "YouTube",
        url: "https://youtube.com/@tfeuerbach"
      }]
    }
  }, {
    resolve: "gatsby-transformer-remark",
    options: {
      footnotes: true
    }
  }, {
    resolve: "gatsby-plugin-sitemap",
    options: {
      output: "/"
    }
  }, {
    resolve: "gatsby-plugin-manifest",
    options: {
      name: "tfeuerbach - Thomas Feuerbach's Personal Page",
      short_name: "tfeuerbach",
      description: "Thomas Feuerbach's personal website for programming, projects, and interesting things.",
      start_url: "/",
      background_color: "#fff",
      // This will impact how browsers show your PWA/website
      // https://css-tricks.com/meta-theme-color-and-trickery/
      // theme_color: `#6B46C1`,
      display: "standalone",
      icons: [{
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      }, {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }]
    }
  }, {
    resolve: "gatsby-plugin-feed",
    options: {
      query: "\n          {\n            site {\n              siteMetadata {\n                title: siteTitle\n                description: siteDescription\n                siteUrl\n                site_url: siteUrl\n              }\n            }\n          }\n        ",
      feeds: [{
        serialize: function serialize(_ref) {
          var _ref$query = _ref.query,
              site = _ref$query.site,
              allPost = _ref$query.allPost;
          return allPost.nodes.map(function (post) {
            var url = site.siteMetadata.siteUrl + post.slug;
            var content = "<p>".concat(post.excerpt, "</p><div style=\"margin-top: 50px; font-style: italic;\"><strong><a href=\"").concat(url, "\">Keep reading</a>.</strong></div><br /> <br />");
            return {
              title: post.title,
              date: post.date,
              excerpt: post.excerpt,
              url: url,
              guid: url,
              custom_elements: [{
                "content:encoded": content
              }]
            };
          });
        },
        query: "{\n  allPost(sort: {date: DESC}) {\n    nodes {\n      title\n      date(formatString: \"MMMM D, YYYY\")\n      excerpt\n      slug\n    }\n  }\n}",
        output: "rss.xml",
        title: "Minimal Blog - @lekoarts/gatsby-theme-minimal-blog"
      }]
    }
  }, shouldAnalyseBundle && {
    resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
    options: {
      analyzerMode: "static",
      reportFilename: "_bundle.html",
      openAnalyzer: false
    }
    /*resolve: `gatsby-plugin-google-gtag`,  <---- add in google analytics
    options: {
      // You can add multiple tracking ids and a pageview event will be fired for all of them.
      trackingIds: [
        "SOME_ID", // Google Analytics
      ],
      // This object is used for configuration specific to this plugin
      pluginConfig: {
        // Puts tracking script in the head instead of the body
        head: true,
      },
    }, */

  }].filter(Boolean)
};