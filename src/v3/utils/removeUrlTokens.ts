import Router from 'next/router'

export function removeUrlTokens() {
  const url = new URL(window.location.href)
  url.searchParams.delete('accessToken')
  url.searchParams.delete('refreshToken')
  Router.replace(url.pathname + url.search, undefined, { shallow: true })
}
