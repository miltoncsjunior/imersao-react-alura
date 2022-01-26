import GlobalStyle from "./Global/GlobalStyle";

export default function AluraCord({ Component, pageProps }) {

    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    )
}