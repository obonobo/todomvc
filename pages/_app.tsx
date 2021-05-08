import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import urlFor from "../src/utils";
import "./app.global.css";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  return (
    <>
      <Head>
        <title>TodoMVC</title>
        <link rel="icon" href={urlFor("/favicon.ico")} />
        {/* <script src="https://apis.google.com/js/platform.js" async defer /> */}
        <meta
          name="google-signin-client_id"
          content="336107596492-q2ci0rdsbq8j001up87vbmlv7ma02mca.apps.googleusercontent.com"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
