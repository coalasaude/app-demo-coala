export const passwordScoreData: Record<number, { bgColor: string; text: string }> = {
  0: {
    bgColor: 'var(--mui-palette-error-main)',
    text: 'Inválida',
  },
  25: {
    bgColor: 'var(--mui-palette-error-main)',
    text: 'Fraca',
  },
  50: {
    bgColor: 'var(--mui-palette-warning-main)',
    text: 'Média',
  },
  75: {
    bgColor: 'var(--mui-palette-info-main)',
    text: 'Boa',
  },
  100: {
    bgColor: 'var(--mui-palette-success-main)',
    text: 'Ótima',
  },
}
