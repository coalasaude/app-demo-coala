import * as yup from 'yup'

import { DiagnoseType } from '@/v3/domain/@v2/appointment/diagnose.model'

export const schemaDiagnose = yup.object({
  cidId: yup.number().required(),
  diagnoseExternal: yup.string().required(),
  date: yup.date().required(),
  type: yup
    .mixed<DiagnoseType>()
    .oneOf(Object.values(DiagnoseType), 'Este campo é obrigatório.')
    .required(),
}) as any
