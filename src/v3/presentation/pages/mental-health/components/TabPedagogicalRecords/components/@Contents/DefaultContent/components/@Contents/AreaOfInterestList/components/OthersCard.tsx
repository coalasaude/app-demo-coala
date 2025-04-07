import { MentalHealthAreaOfInterestOtherResultBrowseModel } from '@/v3/domain/@v2/mental-health/registers/area-of-​​interest/area-of-​​interest-other-result-browse.model'
import { InterestAreaCategory } from '@/v3/domain/@v2/mental-health/enums/pedagogical-area-type.enum'

import { CardContent } from '../../components/CardContent'

type OthersCardProps = {
  model: MentalHealthAreaOfInterestOtherResultBrowseModel
  handleEdit: (id: number) => void
  handleDelete: (id: number, category: InterestAreaCategory) => Promise<void>
}
export const OthersCard = ({ handleEdit, handleDelete, model }: OthersCardProps) => {
  return (
    <CardContent
      onDelete={() => handleDelete(model.id, InterestAreaCategory.OTHERS)}
      onEdit={() => handleEdit(model.id)}
      createdAt={model.createdAt}
      title={model.title}
      description={model.observations || '-'}
      descriptionLabel='Descrição'
    />
  )
}
