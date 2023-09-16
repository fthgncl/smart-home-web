import * as React from 'react';
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

import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useFormik} from 'formik';
import {signUpSchema} from "../schemas/signUpSchema";

const defaultTheme = createTheme();

const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);

    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
    actions.resetForm();
};

export default function SignUp() {

    const [showPassword, setShowPassword] = React.useState(false);

    const {values, touched, handleBlur, errors, isSubmitting, handleChange, handleSubmit} = useFormik({
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
                    <Avatar  sx={{m: 1, bgcolor: 'secondary.main' , width: '75px', height:'75px'}}>
                        <AccountCircle fontSize='large' />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Yeni Kullanıcı
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onBlur={handleBlur}
                                    error={Boolean(errors.name) && touched.name}
                                    value={values.name}
                                    helperText={touched.name && errors.name}
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
                                    error={Boolean(errors.surname) && touched.surname}
                                    value={values.surname}
                                    helperText={touched.surname && errors.surname}
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
                                    error={Boolean(errors.email) && touched.email}
                                    value={values.email}
                                    helperText={touched.email && errors.email}
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
                                    error={Boolean(errors.phone) && touched.phone}
                                    value={values.phone}
                                    helperText={touched.phone && errors.phone}
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
                                    error={Boolean(errors.password) && touched.password}
                                    value={values.password}
                                    helperText={touched.password && errors.password}
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
                                                aria-label="toggle password visibility"
                                                onClick={()=>setShowPassword(true)}
                                                onMouseDown={()=>setShowPassword(false)}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onBlur={handleBlur}
                                    error={Boolean(errors.confirmPassword) && touched.confirmPassword}
                                    value={values.confirmPassword}
                                    helperText={touched.confirmPassword && errors.confirmPassword}
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
                                                aria-label="toggle password visibility"
                                                onClick={()=>setShowPassword(true)}
                                                onMouseDown={()=>setShowPassword(false)}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
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
                            Hesap Oluştur
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