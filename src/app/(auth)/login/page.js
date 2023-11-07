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
import {Alert} from "@mui/joy";

export default function SignIn() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername !== null && storedUsername.length !== 0) {
            setUsername(storedUsername);
        }

        const token = sessionStorage.getItem('token')
        if (token !== null && token.length > 0) setAlert(true)
    }, [])

    const handleSignIn = (data) => {
        setLoading(true)
        axios.post(config.server.concat('/login'), {
            username: data.username,
            password: data.password
        }).then((response) => {
            if (data.persistent) localStorage.setItem('username', data.username)
            sessionStorage.setItem('token', response.data.token);
            const redirect = sessionStorage.getItem('redirect')
            sessionStorage.removeItem('redirect')
            if (redirect !== null) router.replace(redirect)
            else router.replace('/')
        }).catch((err) => {
            if (err.response) {
                if (err.response.status === 401) setError("Incorrect username or password. Please try again.");
                else if (err.response.status === 403) setError(err.response.data.message)
                else setError("An unexpected error occurred. Please try again later.");
            } else if (err.request) setError("Something isn't working right now... Please try again later.");
            else setError("Yikes! We're having trouble fulfilling your request right now. Please try again later.");
        }).finally(() => setLoading(false))
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
                    {alert && <Alert sx={{zIndex: 2, justifyContent: 'center', position: 'relative'}} color="danger" size="md">Please sign in to complete this action.</Alert>}
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
                            autoComplete="off"
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
                                <Link fontSize="sm" href="/login" fontWeight="lg">
                                    Forgot your password?
                                </Link>
                            </Box>
                            <Button loading={loading} type="submit" fullWidth>
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
