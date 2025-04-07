import { capitalize } from 'lodash'

const FORBIDDEN_WORDS = ['de', 'da', 'do', 'dos', 'das', 'e', 'a', 'o']

export const capitalizeName = (name?: string) => {
  if (!name) return ''
  const splitted = name.split(' ')
  const capitalized = splitted.map((word) => {
    const loweredWord = word.toLowerCase()
    if (FORBIDDEN_WORDS.includes(loweredWord)) return loweredWord
    return capitalize(word)
  })

  return capitalized.join(' ')
}
