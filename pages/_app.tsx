import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { assetPrefix } from "../src/utils";
import "./app.global.css";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  return (
    <>
      <Head>
        <title>TodoMVC</title>
        <link rel="icon" href={`${assetPrefix}/favicon.ico`} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
