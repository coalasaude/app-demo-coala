import { ProfessionalReferenceModel } from '@/v3/domain/@v2/users/professional-reference.model'

export type UserInfoHealthProfessionalProps = {
  professionalReference: ProfessionalReferenceModel[]
  onAdd: () => void
  onDelete: (id: number) => void
  isLoading?: boolean
}
