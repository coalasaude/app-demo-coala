import * as yup from 'yup'

export const schema = yup.object({
  title: yup.string().required(),
  file: yup
    .mixed<File>()
    .required()
    .nullable()
    .test('file', 'É necessário selecionar um arquivo', (file) => {
      return file !== null
    }),
})

export const initialValues = {
  title: '',
  file: null,
}
