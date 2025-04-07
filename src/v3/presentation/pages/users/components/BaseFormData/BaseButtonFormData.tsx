import { CBaseFormButtonStyled, EditOutlinedIconStyled } from './styles'

type Props = {
  onClick?: () => void
  canAction: boolean
}

export const BaseButtonFormData = ({ onClick, canAction }: Props) => {
  return (
    <CBaseFormButtonStyled canAction={canAction} onClick={onClick}>
      <EditOutlinedIconStyled canAction={canAction} />
    </CBaseFormButtonStyled>
  )
}
