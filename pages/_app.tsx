import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../app/store";
import "../styles/Login.css";
import "../styles/globals.css";
import "../styles/Sidebar.css";
import "../styles/overview.css";
import "../styles/transactions.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
