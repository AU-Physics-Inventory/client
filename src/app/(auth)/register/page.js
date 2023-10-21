'use client'

import {useRouter} from "next/navigation";
import {CssVarsProvider} from "@mui/joy/styles";
import {FormHelperText, Sheet} from "@mui/joy";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel, {formLabelClasses} from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import {useEffect, useState} from "react";
import CssBaseline from "@mui/joy/CssBaseline";
import GlobalStyles from "@mui/joy/GlobalStyles";
import axios from "axios";
import config from "@/resources/config";
import Box from "@mui/joy/Box";

export default function Register() {
    const router = useRouter()
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState('')
    const [passwordConf, setPasswordConf] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (success) setTimeout(() => router.replace('/login'), 5000)
    },[router, success])

    const handleRegistration = (data) => {
        if (data.password !== data.passwordConf) {
            setError('Passwords must match.')
        } else {
            axios.post(config.server.concat('/register'), {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                username: data.username,
                password: data.password
            }).then((response) => {
                setSuccess(true)
            }).catch((error) => {
                if (error.response.status === 400) {
                    console.log('Unsuccessful registration attempt.')
                    const response = error.response.data
                    if (!response.validFirstName) setError('First name must not be empty')
                    else if (!response.validLastName) setError('Last name must not be empty')
                    else if (!response.validEmail) setError('Invalid email')
                    else if (!response.validUsername) setError('Username must not be empty and may only contain letters and numbers')
                    else if (!response.validPassword) setError('Password does not meet minimum security requirements')
                    else if (!response.uniqueEmail) setError('An account with this email already exists')
                    else if (!response.uniqueUsername) setError('Username is already taken')
                } else {
                    setError("An unexpected error occurred. Please try again later.");
                }
            }).finally(() => setLoading(false));
        }
    }

    return <CssVarsProvider>
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
        <Sheet color="neutral" variant="soft" component="main"
               sx={{
                   my: 'auto',
                   py: 3,
                   pb: 5,
                   display: 'flex',
                   flexDirection: 'column',
                   gap: 5,
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
               }}>
            {!success ? <Box sx={{w: 1}}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography component="h1" fontSize="xl2" fontWeight="lg" sx={{mx: 'auto'}}>
                        Register a new account
                    </Typography>
                </Box>
                <form autoComplete="off" onSubmit={(event) => {
                    event.preventDefault();
                    setLoading(true)
                    const formElements = event.currentTarget.elements;
                    const data = {
                        firstName: formElements.firstName.value,
                        lastName: formElements.lastName.value,
                        email: formElements.email.value,
                        username: formElements.username.value,
                        password: formElements.password.value,
                        passwordConf: formElements.passwordConf.value
                    };
                    handleRegistration(data);
                }}>
            <FormControl required>
                <FormLabel>First Name</FormLabel>
                <Input type="text" name="firstName"/>
            </FormControl>
            <FormControl required>
                <FormLabel>Last Name</FormLabel>
                <Input type="text" name="lastName"/>
            </FormControl>
            <FormControl required>
                <FormLabel>E-mail</FormLabel>
                <Input type="email" name="email"/>
            </FormControl>
            <FormControl required>
                <FormLabel>Username</FormLabel>
                <Input type="text"
                       name="username"
                       onChange={(event) => setUsername(event.target.value)}
                       error={!/^[0-9a-z]*$/i.test(username)}
                />
            </FormControl>
            <FormControl error={password !== passwordConf} required>
                <FormLabel>Password</FormLabel>
                <Input onChange={(e) => setPassword(e.target.value)} type="password" name="password"/>
                <Typography level="body-xs">8-20 characters. Must include at least one uppercase letter, one lowercase letter, one number, and one symbol.</Typography>
            </FormControl>
            <FormControl error={password !== passwordConf} required>
                <FormLabel>Confirm Password</FormLabel>
                <Input onChange={(e) => setPasswordConf(e.target.value)} type="password" name="passwordConf"/>
                {(password !== passwordConf) && <FormHelperText>Passwords must match.</FormHelperText>}
            </FormControl>
            <Button loading={loading} type="submit" fullWidth>
                Register
            </Button>
        </form>
        {error && <Typography color="danger"
                              level="body-sm"
                              variant="soft"
                              sx={{my: 1, mb: 3, mx: 'auto', gap: 5}}>
        {error}
    </Typography>}</Box> : <Box sx={{my: 3, display: 'flex', flexDirection: 'column'}}>
                <Typography component="h1" fontSize="xl2" fontWeight="lg" sx={{mx: 'auto'}}>
                    Thank you for registering
                </Typography>
                <Typography level="body-lg">
                    Please check your email for a confirmation link
                </Typography>
            </Box>}
        </Sheet>
    </CssVarsProvider>
}
