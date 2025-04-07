import { MentalHealthAreaOfInterestAcademicResultBrowseModel } from '@/v3/domain/@v2/mental-health/registers/area-of-​​interest/area-of-​​interest-academic-result-browse.model'
import { InterestAreaCategory } from '@/v3/domain/@v2/mental-health/enums/pedagogical-area-type.enum'

import { CardContent } from '../../components/CardContent'

type OthersCardProps = {
  model: MentalHealthAreaOfInterestAcademicResultBrowseModel
  handleEdit: (id: number) => void
  handleDelete: (id: number, category: InterestAreaCategory) => Promise<void>
}
export const AcademicCard = ({ handleEdit, handleDelete, model }: OthersCardProps) => {
  return (
    <CardContent
      onDelete={() => handleDelete(model.id, InterestAreaCategory.ACADEMIC)}
      onEdit={() => handleEdit(model.id)}
      title={model.interests}
      textLabel='Disciplina que tem facilidade'
      text={model.proficients || '-'}
      createdAt={model.createdAt}
      description={model.observations}
      descriptionLabel='Observações'
    />
  )
}
