import * as yup from 'yup'

import { ReportTypeEnum } from '../../constants/report-type'

export const schemaReport = yup.object({
  reportType: yup.mixed().required(),
  period: yup.date().required(),
  institutionsIds: yup.array().of(yup.number().required()).min(1).required(),
}) as any

export interface IReportFormFields {
  reportType: ReportTypeEnum
  period: Date
  institutionsIds: number[]
}

export const initialReportValues = {
  reportType: ReportTypeEnum.HEALTH_HISTORY,
  period: new Date(),
  institutionsIds: [],
} as unknown as IReportFormFields
