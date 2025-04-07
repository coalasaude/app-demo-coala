import { RecordsType } from '@/types/records'

import { AttachmentContent } from './Components/AttachmentContent'
import { Diagnose } from './Components/DiagnoseContent'
import { ExamContent } from './Components/ExamContent'
import { MedicalRecordContent as MedicalRecord } from './Components/MedicalRecordContent'
import { PrescriptionContent } from './Components/PrescriptionContent'
import { Reportcontent } from './Components/ReportContent'
import { SickNoteContent } from './Components/SickNoteContent'
import { RecordContentProps } from './types/TRecords'

type ContentMapType = Partial<
  Record<RecordsType, { component: (props: RecordContentProps) => JSX.Element }>
>

export const contentMap: ContentMapType = {
  [RecordsType.MEDICAL_RECORDS]: { component: MedicalRecord },
  [RecordsType.SICKNOTE]: { component: SickNoteContent },
  [RecordsType.REPORTS]: { component: Reportcontent },
  [RecordsType.EXAM]: { component: ExamContent },
  [RecordsType.ATTACHMENTS]: { component: AttachmentContent },
  [RecordsType.PRESCRIPTION]: { component: PrescriptionContent },
  [RecordsType.APPOINTMENT_DIAGNOSE]: { component: Diagnose },
}
