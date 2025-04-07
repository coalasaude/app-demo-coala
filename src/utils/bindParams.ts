export const bindPathParams = (path: string, pathParams: Record<string, any>) => {
  return Object.keys(pathParams).reduce((result, key) => {
    const value = pathParams[key]
    if (!value) return result
    return result.replaceAll(`[${key}]`, String(pathParams[key]))
  }, path)
}
