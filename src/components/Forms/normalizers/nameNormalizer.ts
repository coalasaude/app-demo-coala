export const nameNormalizer = (name: string) => {
  if (!name) {
    return name
  }

  const normalizedName = name.replace(/[^a-zA-Z\u00C0-\u00FF\s]*$/g, '')
  return normalizedName.replace(/\s\s+/g, '')
}
