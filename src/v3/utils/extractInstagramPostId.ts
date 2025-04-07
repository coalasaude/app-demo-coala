export function extractInstagramPostId(url: string) {
  const regex = /\/p\/([A-Za-z0-9_-]+)/
  const match = url.match(regex)
  return match ? match[1] : null
}
