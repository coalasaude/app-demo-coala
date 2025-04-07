export const contains = (data: Record<string, any>, comparedObject: Record<string, any>) => {
  return !Object.keys(data).some((key) => {
    const currentValue = data[key]
    const objValue = comparedObject[key]

    if (comparedObject.hasOwnProperty(key) && currentValue === objValue) {
      return false
    }

    return true
  })
}
