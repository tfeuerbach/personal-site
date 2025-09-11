import * as React from "react";
import { useColorMode } from "theme-ui";
import { Highlight } from "prism-react-renderer"; // No more defaultProps
import { calculateLinesToHighlight, getLanguage, GetLanguageInput } from "@lekoarts/themes-utils";
import { themes } from 'prism-react-renderer';
import Copy from "./copy";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";

type CodeProps = {
  codeString: string;
  withLineNumbers?: boolean;
  highlight?: string;
  title?: string;
  className: GetLanguageInput;
};

const Code = ({
  codeString,
  withLineNumbers = false,
  title = ``,
  className: blockClassName,
  highlight = ``,
}: CodeProps) => {
  const { showLineNumbers, showCopyButton } = useMinimalBlogConfig();
  const [colorMode] = useColorMode();
  const isDark = colorMode === `dark`;
  const lightTheme = themes.github;
  const darkTheme = themes.vsDark;

  const language = getLanguage(blockClassName);
  const shouldHighlightLine = calculateLinesToHighlight(highlight);
  const shouldShowLineNumbers = withLineNumbers || showLineNumbers;

  return (
    <Highlight code={codeString} language={language} theme={isDark ? darkTheme : lightTheme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <React.Fragment>
          <div className="gatsby-highlight" data-language={language}>
            {title && (
              <div className="code-title">
                <div>{title}</div>
              </div>
            )}
            <pre className={className} style={style} data-linenumber={shouldShowLineNumbers}>
              {showCopyButton && <Copy content={codeString} fileName={title} />}
              <code className={`code-content language-${language}`}>
                {tokens.map((line, i) => {
                  const lineProps = getLineProps({ line, key: i });

                  if (shouldHighlightLine(i)) {
                    lineProps.className = `${lineProps.className} highlight-line`;
                    lineProps.style = {
                      ...lineProps.style,
                      backgroundColor: isDark ? `rgba(255, 255, 255, 0.1)` : `rgba(0, 0, 0, 0.035)`,
                    };
                  }

                  return (
                    <div {...lineProps}>
                      {shouldShowLineNumbers && <span className="line-number-style">{i + 1}</span>}
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>
        </React.Fragment>
      )}
    </Highlight>
  );
};

export default Code;

