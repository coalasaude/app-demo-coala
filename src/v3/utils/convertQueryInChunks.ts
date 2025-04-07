export function convertQueryValueInChunks({
  queryValue,
  queryName,
}: {
  queryValue: string
  queryName: string
}) {
  const searchParams = new URLSearchParams()

  const urlChunks = queryValue.match(/.{1,100}/g)
  urlChunks?.forEach((chunk) => {
    searchParams.append(queryName, chunk)
  })

  return searchParams
}
