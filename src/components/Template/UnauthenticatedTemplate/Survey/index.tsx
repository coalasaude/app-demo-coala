import { SvgIconComponent } from '@mui/icons-material'
import { Box } from '@mui/material'

import { StyledSelectCard } from './styles'
import SmallSelectCardContent from './SmallSelectCardContent'

type Props = {
  onClick: (...params: any) => void
  name: string
  isSelected: boolean
  Icon: SvgIconComponent
}

const SelectCardSurvey = ({ onClick, name, isSelected, Icon }: Props) => {
  return (
    <Box ml={2}>
      <StyledSelectCard isSelected={isSelected} onClick={onClick}>
        <SmallSelectCardContent name={name} Icon={Icon} />
      </StyledSelectCard>
    </Box>
  )
}

export default SelectCardSurvey
