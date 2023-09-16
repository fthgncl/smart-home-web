import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const phoneRules = /^[0-9]{10}$/;

export const signUpSchema = yup.object().shape({

    name: yup
        .string()
        .min(3, 'İsminiz en az 3 karakter içermelidir.')
        .max(20, 'İsminiz 20 karakterden daha fazla olamaz.')
        .required('İsim boş bırakılamaz.'),

    surname: yup
        .string()
        .min(3, 'Soyisminiz en az 3 karakter içermelidir.')
        .max(20, 'Soyisminiz 20 karakterden daha fazla olamaz.')
        .required('Soyisim boş bırakılamaz.'),

    email: yup
        .string()
        .email('Geçerli bir e-posta adresi giriniz.')
        .required('e-posta boş bırakılamaz'),

    phone: yup
        .string()
        .matches(phoneRules, {
            message: 'Geçerli bir telefon numarası giriniz.',
        }),

    password: yup
        .string()
        .required('Lütfen bir şifre belirleyiniz.')
        .min(6, 'Şifre en az 6 haneli olmalıdır.')
        .matches(passwordRules, {
            message: 'Şifre en az bir büyük , bir küçük harf ve bir sayı içermelidir.',
        }),


    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Şifreler eşleşmiyor')
        .required('Tekrar şifre girmek zorunludur')

});