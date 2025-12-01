import React from "react"

export const onRenderBody = ({ setHtmlAttributes, setPostBodyComponents }) => {
  setHtmlAttributes({ lang: `en` })
  setPostBodyComponents([
    <script key="netlify-identity-widget" src="https://identity.netlify.com/v1/netlify-identity-widget.js" defer />,
  ])
}
