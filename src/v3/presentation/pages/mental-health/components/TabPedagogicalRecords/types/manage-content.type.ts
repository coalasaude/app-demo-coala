import { InterestAreaCategory } from '@/v3/domain/@v2/mental-health/enums/pedagogical-area-type.enum'
import { PedagogicalRecordType } from '@/v3/domain/@v2/mental-health/enums/pedagogical-record-type.enum'

export type ManageContentProps = {
  userId: number
  id: number
  onEdit: (props: {
    id: number
    type: PedagogicalRecordType
    category?: InterestAreaCategory
  }) => void
  onAdd: (props: { type: PedagogicalRecordType }) => void
  onBackToRegisters: () => void
}
