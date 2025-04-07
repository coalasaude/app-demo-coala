export const BASE_GRID = 8

export const spacing = (...spaces: number[]) =>
  spaces.map((space) => `${space * BASE_GRID}px`).join(' ')
