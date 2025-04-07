import * as yup from 'yup'

import { AuthorizationStatus } from '@/v3/domain/medicine'

export const schema = yup.object().shape({
  startHour: yup
    .number()
    .nullable()
    .when('initUsageStatus', {
      is: (initUsageStatus: boolean) => initUsageStatus,
      then: (schema) => schema.required(),
    }),
  startDate: yup
    .date()
    .nullable()
    .when('initUsageStatus', {
      is: (initUsageStatus: boolean) => initUsageStatus,
      then: (schema) => schema.required(),
    }),
  authorizationStatus: yup
    .mixed<AuthorizationStatus>()
    .oneOf(
      [AuthorizationStatus.AUTHORIZED_SCHOOL, AuthorizationStatus.NOT_AUTHORIZED],
      'O status de autorização é obrigatório',
    )
    .required(),
  initUsageStatus: yup.boolean().optional(),
  stopUsage: yup.boolean().optional(),
})
