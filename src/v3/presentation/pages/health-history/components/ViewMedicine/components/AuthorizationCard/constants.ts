export const hoursOfTheDay = Array(24)
  .fill(0)
  .map((_, i) => {
    return ('0' + i + ':00').slice(-5)
  })
