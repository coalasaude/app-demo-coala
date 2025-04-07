export const getRoutes = (arr: { urlName: string; url: string }[], key: string): string => {
  const url = arr.find(({ urlName }) => urlName === key)?.url || ''

  return url
}
