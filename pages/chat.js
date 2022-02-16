import { Box, Button, Image, Text, TextField } from '@skynexui/components';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import React from 'react';
import appConfig from '../config.json';
import ButtonSendSticker from './src/components/ButtonSendSticker';


const supabaseClient = createClient(appConfig.supabase.url, appConfig.supabase.anonkey);

function liveMessages(addMessage) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (data) => {
            addMessage(data.new);
        })
        .subscribe();
}

export default function Chat() {
    const route = useRouter();
    const usernameGitHub = route.query.usernameGitHub;
    const [mensagem, setMensagem] = React.useState('');
    const [mensagemList, setMensagemList] = React.useState([]);

    React.useEffect(() => {
        supabaseClient.from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                setMensagemList(data)
            });

        liveMessages((newMessage) => {
            setMensagemList((newListMessage) => {
                return [
                    newMessage,
                    ...newListMessage,
                ]
            });
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    function handleSubmit(text) {
        const objMensagem = {
            de: usernameGitHub,
            texto: text,
        };

        supabaseClient
            .from('mensagens')
            .insert([objMensagem])
            .then(({ data }) => {
                // Manter data para disparar o evento de inserção ?
            });

        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary['050'],
                backgroundImage: 'url(https://assets.epuzzle.info/puzzle/072/716/original.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundBlendMode: 'multiply',
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {mensagemList.length === 0 ?
                        (<Image
                            styleSheet={{
                                width: '100%',
                                height: '100%',
                                top: 0,
                                left: 0
                            }}
                            src={`/static/images/load.gif`}
                        />) : (
                            <>
                                <MessageList messages={mensagemList} setList={setMensagemList} />

                                {/*
                                    mensagemList.map((item) => {
                                        return (
                                            <li>
                                                {item};
                                            </li>
                                        );
                                    })
                                */}

                                <Box
                                    as="form"
                                    styleSheet={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <TextField
                                        value={mensagem}
                                        onChange={
                                            (event) => {
                                                setMensagem(event.target.value);
                                            }
                                        }
                                        onKeyPress={
                                            (event) => {
                                                if (event.key === 'Enter') {
                                                    event.preventDefault();
                                                    handleSubmit(mensagem);
                                                }
                                            }
                                        }
                                        placeholder="Insira sua mensagem aqui..."
                                        type="textarea"
                                        styleSheet={{
                                            width: '100%',
                                            border: '0',
                                            resize: 'none',
                                            borderRadius: '5px',
                                            padding: '6px 8px',
                                            backgroundColor: appConfig.theme.colors.neutrals[800],
                                            marginRight: '12px',
                                            color: appConfig.theme.colors.neutrals[200],
                                        }}
                                    />
                                    {/* CallBack */}
                                    <ButtonSendSticker
                                        onStickerClick={(sticker) => {
                                            handleSubmit(':sticker: ' + sticker);
                                        }}
                                    />
                                </Box>
                            </>
                        )
                    }
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box
                styleSheet={
                    {
                        width: '100%',
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }
                }
            >
                <Text
                    styleSheet={
                        {
                            color: appConfig.theme.colors.neutrals[200]
                        }
                    }
                    variant='heading5'
                >
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.messages.map((objMensagem) => {
                return (
                    <Text
                        key={objMensagem.id}
                        tag="li"
                        styleSheet={
                            {
                                borderRadius: '5px',
                                padding: '6px',
                                marginBottom: '12px',
                                hover: {
                                    backgroundColor: appConfig.theme.colors.neutrals[700],
                                }
                            }
                        }
                    >
                        <Box
                            styleSheet={
                                {
                                    marginBottom: '8px',
                                    display: 'flex'
                                }
                            }
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${objMensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {objMensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {/* [Declarativo] */}
                        {objMensagem.texto.startsWith(':sticker:')
                            ? (
                                <Image src={objMensagem.texto.replace(':sticker:', '')} />
                            )
                            : (
                                objMensagem.texto
                            )
                        }
                    </Text>
                )
            })}
        </Box>
    )
}