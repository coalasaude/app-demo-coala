export const formatFullName = (name: string, lastname?: string) => {
  if (name && lastname) {
    return `${name} ${lastname}`
  } else if (name) {
    return name
  }
  return ''
}
