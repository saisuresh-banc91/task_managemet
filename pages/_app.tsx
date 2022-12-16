import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../app/store'
import Head from 'next/head'
import Script from 'next/script'
import '../styles/Login.css'
import '../styles/globals.css'
import '../styles/Sidebar.css'
import '../styles/overview.css'
import '../styles/transactions.css'
import Layout from '../layout/layout'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <Script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
                crossOrigin="anonymous"
            />
            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </>
    )
}
