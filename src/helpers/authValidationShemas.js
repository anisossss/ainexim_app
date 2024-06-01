import * as yup from 'yup'
export const useErrorMessages = () => {
  return {
    ErrorMessages: {
      email: 'Invalid email address',
      password:
        'Password must contain at least one number, one lowercase and one uppercase letter, and at least 6 characters',
    },
  }
}

export const useValidation = () => {
  const regExp = {
    email: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
    password: /^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*)$/,
  }

  const { ErrorMessages } = useErrorMessages()

  return {
    loginValidationSchema: yup.object().shape({
      email: yup.string().required(ErrorMessages.email).email('Invalid email address'),
      password: yup
        .string()
        .required(ErrorMessages.password)
        .min(6, 'Password must be at least 6 characters')
        .matches(regExp.password, 'Invalid password format'),
    }),
  }
}
