import * as yup from 'yup'

export const cnpjValidator = yup
  .string()
  .max(14)
  .test('cnpj-validator', 'O CNPJ informado é inválido', function (cnpj?: string) {
    cnpj = cnpj?.replace(/\D/g, '')

    if (!cnpj) return true
    if (cnpj?.length != 14) return false

    const regexIsAllEquals = /^(\d)\1{13}$/
    if (regexIsAllEquals.test(cnpj)) return false

    for (let i = 2; i >= 1; i--) {
      const length = cnpj.length - i
      const cnpjDigits = cnpj.substring(0, length)

      let sum = 0

      for (let i = length - 1; i >= 0; i--) {
        const columnIndex = (i % 8) + 2
        const lastIndexCNPJ = cnpjDigits.length - 1
        const digit = cnpjDigits[lastIndexCNPJ - i]

        sum += Number(digit) * columnIndex
      }

      const digit = sum % 11 < 2 ? 0 : 11 - (sum % 11)

      if (digit != Number(cnpj.charAt(length))) return false
    }

    return true
  })
