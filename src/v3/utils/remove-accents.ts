export const removeAccents = (value: string) =>
  value?.normalize('NFD')?.replace(/[\u0300-\u036f]/g, '')
