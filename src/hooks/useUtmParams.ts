import { useRouter } from 'next/router'

export const useUtmParams = () => {
  const { query } = useRouter()
  const utmParams = Object.entries(query).filter(([key]) => key.startsWith('utm_'))
  const toObject = (params: [string, string | string[] | undefined][]): Record<string, any> =>
    params.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

  return toObject(utmParams)
}
