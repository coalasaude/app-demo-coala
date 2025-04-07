import {
  isArray,
  compact,
  isObject,
  isBoolean,
  isEmpty,
  every,
  isUndefined,
  omitBy,
  mapValues,
} from 'lodash'

export function omitEmpty<T extends object>(obj: T): any {
  if (isArray(obj)) {
    return compact(obj)
  } else if (isObject(obj)) {
    const sanitizedValues = omitBy(obj, (value) => {
      if (isBoolean(value)) return false
      return isEmpty(value)
    })

    if (every(sanitizedValues, isUndefined)) {
      return undefined
    }

    return mapValues(sanitizedValues, omitEmpty)
  } else {
    return obj
  }
}
