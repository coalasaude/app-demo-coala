import * as yup from 'yup'
export const addressValidator = yup.lazy((value) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...address } = value || {}
  if (Object.keys(address)?.some((key) => address[key])) {
    return yup.object({
      zip_code: yup.string().required(),
      city: yup.string().required(),
      neighborhood: yup.string().required(),
      state: yup.string().required(),
      street: yup.string().required(),
      number: yup.string(),
      complement: yup.string().nullable(),
    })
  }

  return yup.object({
    zip_code: yup.string(),
    city: yup.string(),
    neighborhood: yup.string(),
    state: yup.string(),
    street: yup.string(),
    number: yup.string(),
    complement: yup.string().nullable(),
  })
})
export default addressValidator
