import { MentalHealthAreaOfInterestExtracurricularResultBrowseModel } from '@/v3/domain/@v2/mental-health/registers/area-of-​​interest/area-of-​​interest-extracurricular-result-browse.model'
import { InterestAreaCategory } from '@/v3/domain/@v2/mental-health/enums/pedagogical-area-type.enum'

import { CardContent } from '../../components/CardContent'

type OthersCardProps = {
  model: MentalHealthAreaOfInterestExtracurricularResultBrowseModel
  handleEdit: (id: number) => void
  handleDelete: (id: number, category: InterestAreaCategory) => Promise<void>
}
export const ExtracurricularCard = ({ handleEdit, handleDelete, model }: OthersCardProps) => {
  return (
    <CardContent
      onDelete={() => handleDelete(model.id, InterestAreaCategory.EXTRACURRICULAR)}
      onEdit={() => handleEdit(model.id)}
      title={model.interests}
      textLabel='Hobbies ou projetos pessoais'
      text={model.proficients}
      createdAt={model.createdAt}
      description={model.observations}
      descriptionLabel='Observações'
    />
  )
}
