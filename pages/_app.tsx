import type { AppProps } from "next/app";
import "../styles/Login.css";
import "../styles/globals.css";
import "../styles/Sidebar.css";
import "../styles/overview.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
