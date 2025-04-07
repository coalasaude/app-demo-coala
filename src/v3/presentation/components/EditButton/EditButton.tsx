import { MouseEvent } from 'react'

import EditIcon from '/public/assets/svg/EditHealthUnitView.svg'

import { Container } from './styles'

type EditButtonProps = {
  onClick?: () => void
}

export const EditButton = ({ onClick }: EditButtonProps) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    onClick && onClick()
  }

  return (
    <Container onClick={handleClick} data-testid='EditButton'>
      <EditIcon />
    </Container>
  )
}
