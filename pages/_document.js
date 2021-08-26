import Document, { Html, Head, Main, NextScript } from "next/document";
// 可以用react portal 在這裏，你可以在component tree 任一地方render component (如notification)
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="notifications"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
