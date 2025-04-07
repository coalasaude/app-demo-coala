import CryptoJS from 'crypto-js'

const secretKey = 'ce30cf1b4edf7042981523cdb74dabd403bf90a3'

export const encrypt = (value: Record<string, unknown> | string) => {
  const currValue = value instanceof Object ? JSON.stringify(value) : value
  return CryptoJS.AES.encrypt(currValue, secretKey).toString()
}

export const decrypt = (value: string) => {
  const bytes = CryptoJS.AES.decrypt(value, secretKey)
  return bytes.toString(CryptoJS.enc.Utf8)
}

export default encrypt
