export function priceNormalizer(value?: string) {
  if (!value) return value

  const onlyNums = Number(value?.replace(/\D/g, '')).toString()

  let cents = onlyNums.slice(-2)

  let real = onlyNums.slice(0, -2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

  if (real.length < 2) real = real.padStart(2, '0')
  if (cents.length < 2) cents = cents.padStart(2, '0')

  return `R$ ${real},${cents}`
}
