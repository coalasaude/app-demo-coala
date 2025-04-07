export function formatDayToPayload(day: string): TAvailableDays {
  switch (day.toLowerCase()) {
    case 'segunda-feira':
      return 'SEGUNDA'
    case 'terça-feira':
      return 'TERCA'
    case 'quarta-feira':
      return 'QUARTA'
    case 'quinta-feira':
      return 'QUINTA'
    case 'sexta-feira':
      return 'SEXTA'
    default:
      return 'DIA INVÁLIDO'
  }
}

export const daysOrder = ['SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA']

export type TAvailableDays = 'SEGUNDA' | 'TERCA' | 'QUARTA' | 'QUINTA' | 'SEXTA' | 'DIA INVÁLIDO'
