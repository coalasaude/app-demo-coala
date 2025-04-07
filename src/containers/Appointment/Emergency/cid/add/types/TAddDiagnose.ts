import { DiagnoseType } from '@/v3/domain/@v2/appointment/diagnose.model'

export interface TAddDiagnose {
  cidId: number
  date: Date
  diagnoseExternal: string
  type: DiagnoseType
  externalDocName?: string
  externalDocCRM?: string
}
