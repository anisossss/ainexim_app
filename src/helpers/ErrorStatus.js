import { useErrorMessages } from './authValidationShemas'

export const useErrorStatus = () => {
  const { ErrorMessages } = useErrorMessages()
  return {
    ErrorStatus: {
      400: 'BAD REQUEST',
      401: 'Wrong email or password. Try again!',
      404: 'NOT FOUND',
      409: 'A user with this email address or name is already registered. Please log in or enter a different email address',
      500: 'Server connection error occurred.',
    },
    getPassErrorStatus: (error, dirty) => {
      if (!error && dirty) {
        return 'valid'
      }
      if (!error && !dirty) {
        return 'normal'
      } else if (error === ErrorMessages.password) {
        return 'notSecure'
      } else if (error !== ErrorMessages.password) {
        return 'inValid'
      }
    },
  }
}
