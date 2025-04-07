export const adapterCalculateAverageTime = (data?: number) => {
  if (typeof data !== 'number') {
    return 0
  }
  return data?.toFixed(0)
}
