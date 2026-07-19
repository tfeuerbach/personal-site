import * as React from "react"
import { useColorMode } from "theme-ui"
import sheetHtml from "./sheet-html"
import { enhanceSheetWithProductLinks } from "./product-links"
import "./miata-build.css"

const enhancedHtml = enhanceSheetWithProductLinks(sheetHtml)

const MiataBuildSheet = () => {
  const [colorMode] = useColorMode()
  const isDark = colorMode === `dark`

  return (
    <div className={`miata-build${isDark ? ` miata-build--dark` : ``}`}>
      <div className="sheet" dangerouslySetInnerHTML={{ __html: enhancedHtml }} />
    </div>
  )
}

export default MiataBuildSheet
