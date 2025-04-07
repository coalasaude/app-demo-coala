export function formatBoolean(value: boolean | undefined) {
  if (value === undefined) return value

  return value ? 'Sim' : 'Não'
}

export function formatArray<T = any>(array?: T[], separator = ', '): string | undefined {
  return array?.join(separator)
}
