export enum ReportTypeEnum {
  HEALTH_HISTORY = 'HEALTH_HISTORY',
}

type IReportType = { label: string; disabledPeriodSelect: boolean }
type IReportTypeMap = Record<ReportTypeEnum, IReportType>

export const ReportTypeMap: IReportTypeMap = {
  [ReportTypeEnum.HEALTH_HISTORY]: {
    label: 'Ficha de Saúde',
    disabledPeriodSelect: true,
  },
} as const

export const getReportType = (type: ReportTypeEnum): IReportType => {
  if (!type)
    return {
      disabledPeriodSelect: true,
      label: '',
    }

  return ReportTypeMap[type]
}
