export const phoneNormalizer = (value?: string) => {
  value = value?.trim()
  if (!value) return value

  const onlyNums = value.replace(/\D/g, '').slice(0, 11)
  const phoneRegex = /^(\d{0,2})((\d{0,4})|(\d{0,5}))(\d{0,4})$/
  const match = onlyNums.match(phoneRegex)

  if (!match) return value

  let phone = ''

  if (match[1]) phone = `(${match[1]}`
  if (match[2]) phone = `${phone}) ${match[2]}`
  if (match[5]) phone = `${phone}-${match[5]}`

  return phone
}

export const mobilePhoneNormalizer = (value: string) => {
  if (!value) return value

  const onlyNums = value.replace(/\D/g, '').slice(0, 11)
  const phoneRegex = /^(\d{0,2})(\d{0,5})(\d{0,4})$/
  const match = onlyNums.match(phoneRegex)

  if (!match) return value

  let phone = ''

  if (match[1]) phone = `(${match[1]}`
  if (match[2]) phone = `${phone}) ${match[2]}`
  if (match[3]) phone = `${phone}-${match[3]}`

  return phone
}
