import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie'

const secretKey = 'ce30cf1b4edf7042981523cdb74dabd403bf90a3'

export const cookies = Cookies.withConverter<any>({
  read: (value) => {
    const bytes = CryptoJS.AES.decrypt(value, secretKey)
    const originalText = bytes.toString(CryptoJS.enc.Utf8)
    return originalText
  },
  write: (value) => {
    const currValue = value instanceof Object ? JSON.stringify(value) : value
    return CryptoJS.AES.encrypt(currValue, secretKey).toString()
  },
})

export const getCookies = (value: string) => {
  try {
    const currentCookies = cookies.get(value)
    if (currentCookies !== undefined && currentCookies) {
      return JSON.parse(currentCookies)
    }
    return {}
  } catch (e) {
    return {}
  }
}

export default cookies
