'use client'

import {CssVarsProvider} from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel, {formLabelClasses} from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Image from "next/image";
import config from "@/resources/config";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function SignIn() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken !== null && storedToken.length !== 0) {
            axios.get(config.server.concat('/validate'), {
                headers: {
                    'Authorization': storedToken
                }
            }).then((response) => {
                if (response.status === 200) {
                    console.log('User already logged in. Redirecting...')
                    //router.push('/app')
                } else {
                    console.log('User token is not valid. Clearing...')
                    localStorage.removeItem('token')
                }
            })
        }

        const storedUsername = localStorage.getItem('username');
        if (storedUsername !== null && storedUsername.length !== 0) {
            setUsername(storedUsername);
        }
    }, [router])

    const handleSignIn = (data) => {
        axios.post(config.server.concat('/login'), {
            username: data.username,
            password: data.password
        }).then((response) => {
            if (data.persistent) {
                localStorage.setItem('username', data.username)
            }

            localStorage.setItem('token', response.data.token);
            router.push('/app')
        }).catch((error) => {
            if (error.response.status === 401) {
                console.log('Unsuccessful login attempt.')
                setError("Incorrect username or password. Please try again.");
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        });
    }

    return (<CssVarsProvider disableTransitionOnChange>
            <CssBaseline/>
            <GlobalStyles
                styles={{
                    ':root': {
                        '--Collapsed-breakpoint': '769px', // form will stretch when viewport is below `769px`
                        '--Cover-width': '40vw', // must be `vw` only
                        '--Form-maxWidth': '700px', '--Transition-duration': '0.4s', // set to `none` to disable transition
                    },
                }}
            />
            <Box
                sx={(theme) => ({
                    width: 'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
                    transition: 'width var(--Transition-duration)',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    backdropFilter: 'blur(4px)',
                    backgroundColor: 'rgba(255 255 255 / 0.6)',
                })}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100dvh',
                        width: 'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
                        maxWidth: '100%',
                        px: 2,
                    }}
                >
                    <Box
                        component="header"
                        sx={{
                            py: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            fontWeight="lg"
                            startDecorator={<Box
                                component="span"
                                sx={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: '50%',
                                    boxShadow: (theme) => theme.shadow.md,
                                    '--joy-shadowChannel': (theme) => theme.vars.palette.primary.mainChannel,
                                }}>
                                <Image src={config.spaces.concat("/logos/B_Physics Inventory-04.png")}
                                       alt="Physics Inventory"
                                       width="24"
                                       height="24"
                                />
                            </Box>}
                        >
                            Physics Inventory
                        </Typography>
                    </Box>
                    <Box
                        component="main"
                        sx={{
                            my: 'auto',
                            py: 2,
                            pb: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width: 400,
                            maxWidth: '100%',
                            mx: 'auto',
                            borderRadius: 'sm',
                            '& form': {
                                display: 'flex', flexDirection: 'column', gap: 2,
                            },
                            [`& .${formLabelClasses.asterisk}`]: {
                                visibility: 'hidden',
                            },
                        }}
                    >
                        <div>
                            <Typography component="h1" fontSize="xl2" fontWeight="lg">
                                Sign in to your account
                            </Typography>
                            <Typography level="body-sm" sx={{my: 1, mb: 3}}>
                                Welcome back
                            </Typography>
                        </div>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                const formElements = event.currentTarget.elements;
                                const data = {
                                    username: formElements.username.value,
                                    password: formElements.password.value,
                                    persistent: formElements.persistent.checked,
                                };
                                handleSignIn(data);
                            }}
                        >
                            <FormControl required>
                                <FormLabel>Username</FormLabel>
                                <Input type="text" name="username" defaultValue={username}/>
                            </FormControl>
                            <FormControl required>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" name="password"/>
                            </FormControl>
                            <Box
                                sx={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                }}
                            >
                                <Checkbox size="sm" label="Remember me" name="persistent"/>
                                <Link fontSize="sm" href="/" fontWeight="lg">
                                    Forgot your password?
                                </Link>
                            </Box>
                            <Button type="submit" fullWidth>
                                Sign in
                            </Button>
                        </form>
                        <Button
                            variant="outlined"
                            color="neutral"
                            fullWidth
                            onClick={() => router.push('/register')}
                        >
                            Register
                        </Button>
                        {error && <Typography color="danger"
                                              level="body-sm"
                                              variant="soft"
                                              sx={{my: 1, mb: 3, mx: 'auto'}}>
                            {error}
                        </Typography>}
                    </Box>
                </Box>
            </Box>
            <Box
                sx={(theme) => ({
                    height: '100%',
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
                    transition: 'background-image var(--Transition-duration), left var(--Transition-duration) !important',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    backgroundColor: 'background.level1',
                    backgroundSize: '50%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url('${config.spaces.concat('/logos/B_Physics Inventory-03.png')}')`
                })}
            />
        </CssVarsProvider>);
}
