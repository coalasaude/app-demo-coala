export const objectToFormData = <T extends Record<string, any>>(obj: T) => {
  const formData = new FormData()
  for (const key in obj) {
    const value = obj[key]
    if (value !== undefined && value !== null) formData.append(key, obj[key])
  }
  return formData
}
