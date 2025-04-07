import { onlyNumsNormalizer } from '@/components/Forms/normalizers/onlyNumsNormalizer'

export const timeNormalizer = (value: string) => {
  const numbers = onlyNumsNormalizer(value)
  const lastNumbers = onlyNumsNormalizer(value).slice(2, 4)
  if (value.length > 2) {
    return `${value.slice(0, 2)}:${lastNumbers}`
  }
  return numbers
}
