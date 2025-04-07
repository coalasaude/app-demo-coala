export function queryStringToObject(queryString: string) {
  const queryParams: Record<string, string | string[]> = {}
  const searchParams = new URLSearchParams(queryString)

  Array.from(searchParams.entries()).forEach(([key, value]) => {
    if (key in queryParams) {
      const existingValue = queryParams[key]
      queryParams[key] = Array.isArray(existingValue)
        ? [...existingValue, value]
        : [existingValue, value]
    } else {
      queryParams[key] = value
    }
  })

  return queryParams
}
