export const onlyNumbers = (value?: string | null) => (value ? value.replace(/\D/g, '') : '')
