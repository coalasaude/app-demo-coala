import { mobilePhoneNormalizer } from './phoneNormalizer'

export const mobilePhoneOrEmailNormalizer = (value: string) => {
  if (!value) return value

  const normalizedPhone = value.replace('(', '').replace(')', '').replace('-', '').replace(' ', '')
  const isNumber = /^\d+$/.test(normalizedPhone)

  if (isNumber) return mobilePhoneNormalizer(value)

  const isNumberExpectLastChar = /^\d+$/.test(normalizedPhone.slice(0, -1))
  if (isNumberExpectLastChar) return normalizedPhone

  return value
}
