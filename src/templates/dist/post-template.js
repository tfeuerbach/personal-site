"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.PostTemplateQuery = void 0;
/** @jsx jsx */
var gatsby_1 = require("gatsby");
var React = require("react");
var theme_ui_1 = require("theme-ui");
var layout_1 = require("../@lekoarts/gatsby-theme-minimal-blog/components/layout");
var item_tags_1 = require("../@lekoarts/gatsby-theme-minimal-blog/components/item-tags");
var PostTemplate = function (_a) {
    var data = _a.data;
    var html = data.markdownRemark.html;
    var px = ["16px", "8px", "4px"];
    var shadow = px.map(function (v) { return "rgba(0, 0, 0, 0.1) 0px " + v + " " + v + " 0px"; });
    return (theme_ui_1.jsx(layout_1["default"], null,
        theme_ui_1.jsx(theme_ui_1.Heading, { as: "h2", variant: "styles.h2" }, data.title),
        theme_ui_1.jsx("p", { sx: { color: "secondary", mt: 3, a: { color: "secondary" }, fontSize: [1, 1, 2] } },
            theme_ui_1.jsx("time", null, data.date),
            data.tags && (theme_ui_1.jsx(React.Fragment, null, " \u2014 ",
                theme_ui_1.jsx(item_tags_1["default"], { tags: data.tags }))),
            data.timeToRead && " \u2014 ",
            data.timeToRead && theme_ui_1.jsx("span", null,
                data.timeToRead,
                " min read")),
        theme_ui_1.jsx("section", { sx: {
                my: 5,
                ".gatsby-resp-image-wrapper": {
                    my: [4, 4, 5],
                    borderRadius: "4px",
                    boxShadow: shadow.join(", "),
                    ".gatsby-resp-image-image": {
                        borderRadius: "4px"
                    }
                },
                variant: "layout.content"
            } },
            theme_ui_1.jsx("div", { dangerouslySetInnerHTML: { __html: html } }))));
};
exports["default"] = PostTemplate;
exports.PostTemplateQuery = gatsby_1.graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query PostPageQuery($id: String!) {\n    markdownRemark(id: { eq: $id }) {\n      frontmatter {\n        title\n      }\n      html\n    }\n  }\n  "], ["\n  query PostPageQuery($id: String!) {\n    markdownRemark(id: { eq: $id }) {\n      frontmatter {\n        title\n      }\n      html\n    }\n  }\n  "])));
var templateObject_1;
