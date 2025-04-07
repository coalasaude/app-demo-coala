import * as yup from 'yup'
import dayjs from 'dayjs'

import { FrequencyInterval, FrequencyIntervalToNumberDictionary } from '@/constants/mentalHealth'

export const PeiPdiSchema = yup.object({
  name: yup.string().required(),
  responsibleCollaboratorId: yup.number().optional(),
  frequency: yup.string().required(),
  day: yup
    .array()
    .of(yup.string())
    .test({
      name: 'day',
      exclusive: true,
      message: 'Quantidade de dias não corresponde a frequência',
      test: function (value) {
        const { frequency } = this.parent

        if (
          frequency &&
          FrequencyIntervalToNumberDictionary[frequency as FrequencyInterval] !==
            Number(value?.length)
        ) {
          return false
        }

        return true
      },
    }),
  duration: yup.string().optional(),
  patientBirthday: yup
    .date()
    .min(
      dayjs(new Date(new Date().setFullYear(new Date().getFullYear() - 100))).toDate(),
      () =>
        `A data de nascimento inserida não é válida. O ano informado excede o limite permitido.`,
    )
    .optional(),
  patientAge: yup.string().optional(),
  conditionSuspicions: yup.string().optional(),
  difficulties: yup.string().required(),
  generalObjectives: yup.string().required(),
})
