import Head from "next/head";
import { Provider } from "next-auth/client";
import "../styles/globals.css";
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
  // 像是profile page就會有 getServerSideProps 傳入的props
  // Provider避免使用useSession 頁面重複判斷
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
