import type { AppProps } from "next/app";
import Head from "next/head";
import { Header } from "../components/Header";
import { DictionaryProvider } from "../hooks/useDictionary";

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DictionaryProvider>
      <Head>
        <title>dictionary</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </DictionaryProvider>
  );
}

export default MyApp;
