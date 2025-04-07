import { SvgIconComponent } from '@mui/icons-material'

import { StyledSelectCard } from './styles'
import SmallSelectCardContent from './SmallSelectCardContent'

type Props = {
  onClick: (...params: any) => void
  name: string
  isSelected: boolean
  Icon: SvgIconComponent
}

const SmallSelectCardSurvey = ({ onClick, name, isSelected, Icon }: Props) => {
  return (
    <StyledSelectCard isSelected={isSelected} onClick={onClick}>
      <SmallSelectCardContent name={name} Icon={Icon} />
    </StyledSelectCard>
  )
}

export default SmallSelectCardSurvey
