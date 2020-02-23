import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'


export default class MyDocument extends Document {
    // static async getInitialProps (ctx) {
  //   console.log("getInitialProps _document")

  //   const initialProps = await Document.getInitialProps(ctx)
  //   return { ...initialProps }
  // }
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render () {
    return (
      <html>
        <Head>
        {/* React Resux Toastr  https://github.com/diegoddox/react-redux-toastr#readme */}
        <link href="https://diegoddox.github.io/react-redux-toastr/7.1/react-redux-toastr.min.css" rel="stylesheet" type="text/css" />
        <link rel='stylesheet' href='/static/vendor/font-awesome/css/font-awesome.css' />
        {this.props.styleTags}
        </Head>
        <body>

          <Main />
          <NextScript />
          <script src="/static/js/jq.js"></script>
          <script src="/static/js/tether.js"></script>
          <script src="/static/js/popper.js"></script>
          <script src="/static/js/bootstrap.js"></script>

          {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script> */}


        </body>
      </html>
    )
  }
}
