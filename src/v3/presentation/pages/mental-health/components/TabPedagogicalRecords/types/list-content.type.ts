import { InterestAreaCategory } from '@/v3/domain/@v2/mental-health/enums/pedagogical-area-type.enum'

export type ListContentProps = {
  userId: number
  handleEdit: (id: number, category?: InterestAreaCategory) => void
}
