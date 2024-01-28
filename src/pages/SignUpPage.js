import {useState} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';

import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useFormik} from 'formik';
import {signUpSchema} from "../schemas/signUpSchema";
import axios from "axios";
import {apiAddress} from '../config'
import MessageVerifyAccount from "../components/MessageVerifyAccount";
import confrimHTML from '../ConfirmEmail';
import {Account} from "../context/AccountContext";
const defaultTheme = createTheme();

export default function SignUp() {

    const token = Account().accountProps.token;
    const auth = token.active;
    if ( auth )
        window.location.href = '/account';

    const [showPassword, setShowPassword] = useState(false);
    const [mailSendedStatus, setMailSendedStatus] = useState(false);


    const onSubmit = async (values, actions) => {
        values.html = await confrimHTML();
        await axios.post(`${apiAddress}/sign-up`, values)
            .then(response => response.data)
            .then(data =>
            {

                const trueInformation =  checkApiErrors(data, actions);
                if ( !trueInformation )
                    return false;


                if ( data.sendEmailResponse.status ===  250) {
                    setMailSendedStatus(true);
                }

            })
            .catch(console.error);

    }

    const {values, touched, handleBlur, errors, isSubmitting, handleChange, handleSubmit, setErrors} = useFormik({
        initialValues: {
            name: 'fatih',
            surname: 'gencal',
            email: 'gencal.fatih61@gmail.com',
            phone: '5466234445',
            password: '00180018Ff',
            confirmPassword: '00180018Ff',
            html: ''
        },
        validationSchema: signUpSchema,
        onSubmit
    });

    const checkApiErrors = (data, actions) => {
        let apiErrors = {};
        if (data.code === 11000) { // Unique Errors
            const nonUniqueKeys = Object.keys(data.keyValue);
            nonUniqueKeys.forEach(key => apiErrors[key] = `${data.keyValue[key]} daha önceden kullanılmış.`);
        } else if (data.errors) {   // Validator Errors
            const nonUniqueKeys = Object.keys(data.errors);
            nonUniqueKeys.forEach(key => apiErrors[key] = data.errors[key].message);
        } else   // Succes ( No Error )
        {
            //actions.resetForm();
            return true;
        }
        setErrors(apiErrors);
        return false;
    }

    return (
        <>{mailSendedStatus&&<MessageVerifyAccount setMailSendedStatus={setMailSendedStatus} email={values.email} />}
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
                            <AccountCircle/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Yeni Kullanıcı
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        onBlur={handleBlur}
                                        helperText={touched.name && errors.name}
                                        error={Boolean(errors.name) && touched.name}
                                        value={values.name}
                                        name="name"
                                        onChange={handleChange}
                                        autoComplete="given-name"
                                        required
                                        fullWidth
                                        id="name"
                                        label="İsim"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        onBlur={handleBlur}
                                        helperText={touched.surname && errors.surname}
                                        error={Boolean(errors.surname) && touched.surname}
                                        value={values.surname}
                                        name="surname"
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        id="surname"
                                        label="Soyisim"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onBlur={handleBlur}
                                        helperText={touched.email && errors.email}
                                        error={Boolean(errors.email) && touched.email}
                                        value={values.email}
                                        name="email"
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        id="email"
                                        label="E-posta Adresi"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onBlur={handleBlur}
                                        helperText={touched.phone && errors.phone}
                                        error={Boolean(errors.phone) && touched.phone}
                                        value={values.phone}
                                        name="phone"
                                        onChange={handleChange}
                                        fullWidth
                                        id="phone"
                                        label="Telefon Numarası"
                                        autoComplete="tel-local"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">+90</InputAdornment>
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onBlur={handleBlur}
                                        helperText={touched.password && errors.password}
                                        error={Boolean(errors.password) && touched.password}
                                        value={values.password}
                                        name="password"
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        label="Parola"
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        autoComplete="new-password"

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
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        onBlur={handleBlur}
                                        helperText={touched.confirmPassword && errors.confirmPassword}
                                        error={Boolean(errors.confirmPassword) && touched.confirmPassword}
                                        value={values.confirmPassword}
                                        name="confirmPassword"
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        label="Parola Tekrarı"
                                        type={showPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        autoComplete="new-password"

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
                                </Grid>
                            </Grid>
                            {/* TODO : Buraya google recaptha(robot sorgusu) ekle*/}
                            <Button
                                disabled={isSubmitting}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                {isSubmitting ? <CircularProgress color="inherit"/> : <>Hesap Oluştur</>}
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Zaten hesabınız var mı? Giriş Yapın.
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}
