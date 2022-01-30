import Head from 'next/head';
import GlobalStyle from './src/components/global/GlobalStyle';

export default function AluraCord({ Component, pageProps }) {

    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/alura.png" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
            </Head>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    )
}