import type { AppProps } from "next/app";
import { DictionaryProvider } from "../hooks/useDictionary";

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DictionaryProvider>
      <Component {...pageProps} />
    </DictionaryProvider>
  );
}

export default MyApp;
