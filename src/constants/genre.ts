export enum Genre {
  MASCULINO = 'Masculino',
  FEMININO = 'Feminino',
  OUTRO = 'Outro',
}

export const GenreOptions = [
  {
    value: Genre.MASCULINO,
    label: Genre.MASCULINO,
  },
  {
    value: Genre.FEMININO,
    label: Genre.FEMININO,
  },
  {
    value: Genre.OUTRO,
    label: 'Não-binário',
  },
]

export const GenreDescription = {
  [Genre.MASCULINO]: 'Masculino',
  [Genre.FEMININO]: 'Feminino',
  [Genre.OUTRO]: 'Não-binário',
}
