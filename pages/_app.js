import Head from "next/head";
import GlobalStyle from "./Global/GlobalStyle";

export default function AluraCord({ Component, pageProps }) {

    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/alura.png" />
            </Head>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    )
}