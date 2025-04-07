import { CardContent } from '../../components/CardContent'
import { BehaviorContentProps } from '../types/behavior-content.type'

export const ChallengingCard = ({ handleEdit, handleDelete, model }: BehaviorContentProps) => {
  return (
    <CardContent
      onDelete={() => handleDelete(model.id)}
      onEdit={() => handleEdit(model.id)}
      title={model.title}
      textLabel='Dificuldade ou desafio'
      text={model.trigger}
      createdAt={model.createdAt}
      description={model.description}
      descriptionLabel='Observações'
    />
  )
}
