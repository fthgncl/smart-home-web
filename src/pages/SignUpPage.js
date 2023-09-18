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

const defaultTheme = createTheme();

export default function SignUp() {

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (values, actions) => {

        await axios.post(`${apiAddress}/api/users`, values)
            .then(response => response.data)
            .then(data => checkApiErrors(data, actions))
            .catch(console.error);

    }

    const {values, touched, handleBlur, errors, isSubmitting, handleChange, handleSubmit,setErrors} = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: signUpSchema,
        onSubmit
    });

    const checkApiErrors = (data,actions) => {
        let apiErrors = {};
        if (data.code === 11000) { // Uniqu Errors
            const nonUniqueKeys = Object.keys(data.keyValue);
            nonUniqueKeys.forEach(key => apiErrors[key] = `${data.keyValue[key]} daha önceden kullanılmış.`);
        } else if (data.errors) {   // Validator Errors
            const nonUniqueKeys = Object.keys(data.errors);
            nonUniqueKeys.forEach(key => apiErrors[key] = data.errors[key].message);
        }
        else   // Succes ( No Error )
        {
            actions.resetForm()
            // TODO : Kayıt başarılı olduktan sonra profil sayfasına vs. yönlendir veya SMS,MAİL doğrulama gibi işlemler ekle.
        }
        setErrors(apiErrors);
    }

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
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main', width: '75px', height: '75px'}}>
                        <AccountCircle fontSize='large'/>
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
                                <Link href="#" variant="body2">
                                    Zaten hesabınız var mı? Giriş Yapın. {/*TODO : Bu linki yönlendirmeyi unutma.*/}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}