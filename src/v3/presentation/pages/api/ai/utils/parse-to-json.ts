export function parseToJson(input: string): object | null {
  try {
    const cleanedInput = input
      .replace(/\n/g, '')
      .replace(/…/g, '')
      .replace(/,\s*}/g, '}')
      .replace(/,\s*]/g, ']')

    const json = JSON.parse(cleanedInput)
    return json
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Erro ao converter string em JSON:', error)
    return null
  }
}
