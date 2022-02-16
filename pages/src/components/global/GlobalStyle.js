import appConfig from '../../../../config.json';

export default function GlobalStyle(props) {
    const Text = props.children;
    const Tag = props.tag;
    const Color = props.color || `${appConfig.theme.colors.neutrals['800']}`;

    return (
        <style global jsx>{`
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                list-style: none;
            }

                        /* ===== Scrollbar CSS ===== */
            /* Firefox */
            * {
                scrollbar-width: thin;
                scrollbar-color: ${Color} ${Color};
            }

            /* Chrome, Edge, and Safari */
            *::-webkit-scrollbar {
                width: 10px;
            }

            *::-webkit-scrollbar-track {
                background: ${Color},
            }

            *::-webkit-scrollbar-thumb {
                background-color: ${Color};
                border-radius: 10px;
                border: none;
            }

            body {
                font-family: 'Open-Sans', sans-serif;
            }

            /* App fit Height*/
            html, body, #__next {
                min-height: 100vh;
                display: flex;
                flex: 1;
            }
            #__next {
                flex: 1;
            }
            #__next > * {
                flex: 1;
            }
        `}</style>
    );
}