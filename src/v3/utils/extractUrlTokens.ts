export function extractUrlTokens() {
  const url = new URL(window.location.href)
  const accessToken = url.searchParams.get('accessToken') || undefined
  const refreshToken = url.searchParams.get('refreshToken') || undefined

  return { accessToken, refreshToken }
}
