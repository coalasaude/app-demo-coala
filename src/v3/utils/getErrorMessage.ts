import { IErrorResp } from '@/types/error.type'

function findFirstString(obj: any): string {
  if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        return obj[key]
      } else {
        const result = findFirstString(obj[key])
        if (result) {
          return result
        }
      }
    }
  }
  return ''
}

export const getErrorMessage = (error: IErrorResp, defaultValue: string) => {
  const data = error?.response?.data
  if (data?.message) return data.message

  const forceMessage = findFirstString(data)
  if (forceMessage) return forceMessage

  return defaultValue
}
