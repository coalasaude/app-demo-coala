type PathParams = Record<string, any>
type QueryParams = Record<string, any>

interface Params {
  queryParams?: QueryParams
  pathParams?: PathParams
}

export function formatURL(url: string, { pathParams, queryParams }: Params): string {
  let formattedURL = url

  if (pathParams) {
    formattedURL = formatPathParams(formattedURL, pathParams)
  }

  if (queryParams) {
    formattedURL = formatQueryParams(formattedURL, queryParams)
  }

  return formattedURL
}

function formatPathParams(url: string, pathParams: Record<string, any>): string {
  const pathParamsKeys = Object.keys(pathParams)
  let formattedURL = url

  if (pathParamsKeys.length) {
    pathParamsKeys.forEach((key) => {
      const regex = new RegExp(`\\[${key}\\]`, 'g')
      formattedURL = formattedURL.replace(regex, pathParams[key])
    })
  }

  return formattedURL
}

function formatQueryParams(url: string, queryParams: Record<string, any>): string {
  const params = new URLSearchParams(queryParams)
  const formattedURL = `${url}?${params.toString()}`
  return formattedURL
}
