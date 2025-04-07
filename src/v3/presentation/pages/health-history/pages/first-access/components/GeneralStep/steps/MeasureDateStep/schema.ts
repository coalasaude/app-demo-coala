import dayjs from 'dayjs'
import * as yup from 'yup'

export interface IMeasureFormFields {
  measurementDate: Date | null
}

export const schemaMeasure = yup.object({
  measurementDate: yup.date().max(dayjs().add(1, 'day')).required(),
}) as any

export const measureInitialValues: IMeasureFormFields = {
  measurementDate: null,
}
