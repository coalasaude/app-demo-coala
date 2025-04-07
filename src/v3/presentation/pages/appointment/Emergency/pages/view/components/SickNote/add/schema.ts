import * as yup from 'yup'

export const schema = yup.object({
  validUntil: yup.number().max(30).required(),
  body: yup.string(),
  preDescription: yup.string().required(),
  useCid: yup.string(),
  cidId: yup
    .number()
    .nullable()
    .when('use_cid', {
      is: (useCid: string) => useCid === 'true',
      then: (schema) => schema.required(),
    }),
}) as any

export interface IForm {
  validUntil: string
  body: string
  certificatePass: string
  typePrescription: string
  preDescription: string
  cidId: number
  medicine: string
}

export const initialValues = {
  certificatePass: '',
  body: 'Atesto que o paciente acima foi atendido em [DATA_ATENDIMENTO] e deve permanecer afastado de suas atividades laborais por [DIAS_ATESTADOS] dia(s) a contar da data de atendimento.',
  validUntil: '',
  preDescription:
    'Atesto que o paciente acima foi atendido em [DATA_ATENDIMENTO] e deve permanecer afastado de suas atividades laborais por [DIAS_ATESTADOS] dia(s) a contar da data de atendimento.',
  useCid: 'false',
  cidId: null,
} as unknown as IForm
