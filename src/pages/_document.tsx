import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document'
import Script from 'next/script'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [
          <div key={1}>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </div>,
        ],
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel='shortcut icon' href='/favicon.ico' />
          <link rel='preload' href='/login.png' as='image' />
          <Script
            defer
            src='https://static.cloudflareinsights.com/beacon.min.js'
            data-cf-beacon='{"token": "fd6ed1ceced648b988b7a3340fe6e1f2"}'
            strategy='afterInteractive'
          />
          <Script src='https://www.youtube.com/iframe_api' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
