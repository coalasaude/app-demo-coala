import * as yup from 'yup'
import dayjs from 'dayjs'

import { BloodType } from '@/v3/presentation/enums/general-information.enum'
import { Genre } from '@/types/genre'

export interface IGeneralDataFormFields {
  birthDate: string
  bloodType: BloodType | null
  genre: Genre | null
}

export const schemaGeneralData = yup.object({
  birthDate: yup
    .date()
    .min(
      dayjs(new Date(new Date().setFullYear(new Date().getFullYear() - 100))).toDate(),
      () =>
        `A data de nascimento inserida não é válida. O ano informado excede o limite permitido.`,
    )
    .required(),
  bloodType: yup.string().nullable(),
  genre: yup.string().required(),
}) as any

export const generalDataInitialValues: IGeneralDataFormFields = {
  birthDate: '',
  bloodType: null,
  genre: null,
}
