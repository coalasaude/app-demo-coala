export const onlyNumsNormalizer = (text: string) =>
  typeof text === 'string' ? text?.replace(/[^\d]/g, '') : text
