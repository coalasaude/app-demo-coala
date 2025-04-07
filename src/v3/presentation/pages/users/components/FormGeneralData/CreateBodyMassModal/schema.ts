import dayjs from 'dayjs'
import * as yup from 'yup'

export const bodyMassSchema = yup.object({
  measurementDate: yup.date().max(dayjs().add(1, 'day')).required(),
  height: yup.string().required(),
  weight: yup.number().required(),
})

export type FormValues = yup.InferType<typeof bodyMassSchema>

export const bodyMassDefaultValues = {
  measurementDate: null,
} as unknown as FormValues
