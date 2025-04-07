import { DiagnoseType } from '@/v3/domain/@v2/appointment/diagnose.model'

import { TAddDiagnose } from './TAddDiagnose'

export const initialDiagnoseValues = {
  cidId: '',
  diagnoseExternal: false,
  date: new Date(),
  type: DiagnoseType.HYPOTHESIS,
} as unknown as TAddDiagnose
