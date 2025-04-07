import { useRouter } from 'next/router'

import EditIcon from '/public/assets/svg/EditHealthUnitView.svg'

import { EditSections } from '../../../../components/Form/Steps'

import { Container } from './styles'

type EditButtonProps = {
  healthUnitId?: number
  section: EditSections
}

export const EditButton = ({ healthUnitId, section }: EditButtonProps) => {
  const router = useRouter()

  const path = `/app/health-unit/${healthUnitId}/edit?section=${section}`

  return (
    <Container onClick={() => router.push(path)}>
      <EditIcon />
    </Container>
  )
}
