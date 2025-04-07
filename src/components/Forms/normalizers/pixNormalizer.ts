import { isValidCPF } from '@brazilian-utils/brazilian-utils'

import { cnpjNormalizer } from './cnpjNormalizer'
import { cpfNormalizer } from './cpfNormalizer'
import { phoneNormalizer } from './phoneNormalizer'

export function pixNormalizer(value?: string) {
  if (!value) return value

  const onlyNums = value.replace(/\D/g, '')

  if (!onlyNums) return value

  if (isCPF(onlyNums)) return cpfNormalizer(onlyNums)
  if (isPhone(onlyNums)) return phoneNormalizer(onlyNums)
  if (isCNPJ(onlyNums) || onlyNums.length > 14) return cnpjNormalizer(onlyNums)
}

function isCPF(value: string) {
  return isValidCPF(value)
}

function isCNPJ(value: string) {
  return value.length === 14
}

function isPhone(value: string) {
  return value.length === 11
}
