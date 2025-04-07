export function appendFormData(params: Record<string, any>) {
  const formData = new FormData()

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key]
      if (value !== undefined) {
        if (value instanceof File || value === null) {
          formData.append(key, value)
        } else if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, value.toString())
        }
      }
    }
  }
  return formData
}
