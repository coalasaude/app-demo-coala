import { camelCase } from 'lodash'

export const convertObjectToCamelCase = <T extends Record<string, any>>(obj: T) => {
  return Object.keys(obj).reduce<T>(
    (result, key) => ({
      ...result,
      [camelCase(key)]: obj[key],
    }),
    {} as any
  )
}
