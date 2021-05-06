import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

/**
 * This `_document.js` includes some code for fixing the "className did not
 * match" bug that happens with Next.js SSR with styled-components and MUI.
 */
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheetSC = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheetSC.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheetSC.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheetSC.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
