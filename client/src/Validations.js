import * as yup from 'yup'

export const validateLogin = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .min('18', 'Too short')
    .required('Required'),
  password: yup.string().min(8, 'Too short').required('Required'),
})

export const validateSignupUser = yup.object().shape({
  firstName: yup.string().min(3, 'Too short').required('required'),
  lastName: yup.string().min(3, 'Too short').required('required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .min('18', 'Too short')
    .required('Required'),
  password: yup.string().min(8, 'Too short').required('Required'),
})
export const ValidateSignupHealthCareProvider = yup.object().shape({
  name: yup.string().min(3, 'Too short').required('required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .min('18', 'Too short')
    .required('Required'),
  password: yup.string().min(8, 'Too short').required('Required'),
})
