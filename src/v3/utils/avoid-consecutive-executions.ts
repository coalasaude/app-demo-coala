export function avoidConsecutiveExecutions(key: string, fn: () => void, delay = 1000 * 60 * 5) {
  const lastExecution = localStorage.getItem(key)

  if (lastExecution && new Date().getTime() - new Date(lastExecution).getTime() < delay) {
    return
  }

  localStorage.setItem(key, new Date().toISOString())

  fn()
}
