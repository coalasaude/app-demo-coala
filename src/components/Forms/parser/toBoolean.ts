export const toBoolean = (value: string) => {
  return value === '' ? null : Boolean(value === 'true')
}
