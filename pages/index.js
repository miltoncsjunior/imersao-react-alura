import { Box, Button, Image, Text, TextField } from '@skynexui/components';
import { useRouter } from 'next/router';
import React from 'react';
import appConfig from '../config.json';
import SubTitle from "./Components/SubTitle";
import Title from "./Components/Title";


// function HomePage() {
//     return (
//         <div>
//             <Title tag="h1">Boas vindas de volta</Title>
//             <SubTitle tag="h2">Discord - Alura Matrix</SubTitle>
//         </div>
//     );
// }

// export default HomePage

export default function HomePage() {
    const [usernameGitHub, setUsernameGitHub] = React.useState('miltoncsjunior');
    const [imageGitHub, setImageGitHub] = React.useState(`https://github.com/${usernameGitHub}.png`);
    const route = useRouter();

    return (
        <>
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
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '800px',
                        borderRadius: '8px', padding: '32px',
                        boxShadow: '0 5px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={
                            function handleSubmit(event) {
                                event.preventDefault();
                                route.push('/chat');
                            }
                        }
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Title tag="h1">{appConfig.name}</Title>
                        <SubTitle tag="h2">{appConfig.version}</SubTitle>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            Bem vindos 😉
                        </Text>

                        <TextField
                            value={usernameGitHub}
                            onChange={
                                function handleChange(event) {
                                    const valueInputed = event.target.value;

                                    setUsernameGitHub(valueInputed);
                                    setImageGitHub(`https://github.com/${valueInputed}.png`)
                                }
                            }
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        {usernameGitHub.length > 2 && (<Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={`https://github.com/${usernameGitHub}.png`}
                        />)}
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {usernameGitHub}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}