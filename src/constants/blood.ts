export enum BloodType {
  A_POSITIVE = 'A+',
  A_NEGATIVE = 'A-',
  B_POSITIVE = 'B+',
  B_NEGATIVE = 'B-',
  AB_POSITIVE = 'AB+',
  AB_NEGATIVE = 'AB-',
  O_POSITIVE = 'O+',
  O_NEGATIVE = 'O-',
  NOT_INFORMED = 'Não Informado',
}

export const BloodTypeOptions = [
  {
    value: BloodType.A_POSITIVE,
    label: BloodType.A_POSITIVE,
  },
  {
    value: BloodType.A_NEGATIVE,
    label: BloodType.A_NEGATIVE,
  },
  {
    value: BloodType.B_POSITIVE,
    label: BloodType.B_POSITIVE,
  },
  {
    value: BloodType.B_NEGATIVE,
    label: BloodType.B_NEGATIVE,
  },
  {
    value: BloodType.AB_POSITIVE,
    label: BloodType.AB_POSITIVE,
  },
  {
    value: BloodType.AB_NEGATIVE,
    label: BloodType.AB_NEGATIVE,
  },
  {
    value: BloodType.O_POSITIVE,
    label: BloodType.O_POSITIVE,
  },
  {
    value: BloodType.O_NEGATIVE,
    label: BloodType.O_NEGATIVE,
  },
]

export const BloodTypeDescription = {
  [BloodType.A_POSITIVE]: 'Tipo A Positivo',
  [BloodType.A_NEGATIVE]: 'Tipo A Negativo',
  [BloodType.B_POSITIVE]: 'Tipo B Positivo',
  [BloodType.B_NEGATIVE]: 'Tipo B Negativo',
  [BloodType.AB_POSITIVE]: 'Tipo AB Positivo',
  [BloodType.AB_NEGATIVE]: 'Tipo AB Negativo',
  [BloodType.O_POSITIVE]: 'Tipo O Positivo',
  [BloodType.O_NEGATIVE]: 'Tipo O Negativo',
}
