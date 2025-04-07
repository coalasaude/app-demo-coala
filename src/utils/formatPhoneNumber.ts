export const formatPhoneNumber = (str: string) => {
  const cleaned = str?.replace(/(\+\d{2})|\ |\(|\)/g, '')
  if (!cleaned || cleaned.length < 11) {
    return ''
  }
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/)

  if (match) {
    return `(${match[1]}) ${match[2]} ${match[3]}`
  }

  return ''
}
