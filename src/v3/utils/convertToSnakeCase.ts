import { snakeCase } from 'lodash'

export const convertToSnakeCase = <T extends Record<string, any>>(obj: T): T => {
  return Object.keys(obj).reduce<T>((result, key) => {
    const value =
      !(obj[key] instanceof Array) &&
      typeof obj[key] === 'object' &&
      obj[key] &&
      Object.keys(obj[key]).length > 0
        ? convertToSnakeCase(obj[key])
        : obj[key]

    if (key.startsWith(key[0]?.toUpperCase())) {
      return {
        ...result,
        [snakeCase(key)]: value,
        [key]: value,
      }
    }
    return {
      ...result,
      [snakeCase(key)]: value,
    }
  }, {} as T)
}
