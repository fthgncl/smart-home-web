import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import WidgetsIcon from '@mui/icons-material/Widgets';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {useState} from "react";
import axios from "axios";
import {apiAddress} from '../config'
import {Account} from "../context/AccountContext";

import { useDispatch } from 'react-redux';
import { userConnected } from '../store/slices/accountSlice';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LoginPage() {

    const token = Account().accountProps.token.active;
    if ( token )
        window.location.href = '/account';

    const dispatch = useDispatch();
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const values = {
            email: data.get('email'),
            password: data.get('password'),
            rememberMe: rememberMe
        };

        await axios.post(`${apiAddress}/login`, values)
            .then(response => response.data)
            .then(data => {
                if (data.error) {
                    setErrorMessage(data.error.message);
                }
                else
                {
                    setErrorMessage('');
                    const token = data.succes.token;
                    dispatch(userConnected({token}));
                    window.location.href = '/';
                }

            })
            .catch(console.error)


    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <WidgetsIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Giriş Yap
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="E-posta Adresi"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Parola"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"

                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        tabIndex={-1}
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(true)}
                                        onMouseDown={() => setShowPassword(false)}
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />
                        <Typography sx={{textAlign: 'center', color: 'red'}} variant='body2'>{errorMessage}</Typography>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" checked={rememberMe} onChange={handleRememberMeChange} />}
                            label="Beni hatırla"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Giriş Yap
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Şifreni mi unuttun?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Hesabınız yok mu? Hesap Oluşturun."}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}