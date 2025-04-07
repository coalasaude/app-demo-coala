import * as yup from 'yup'
export const passwordValidator = yup
  .string()
  .matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
    'Senha deve conter no minímo 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caracter especial.'
  )
  .required()
