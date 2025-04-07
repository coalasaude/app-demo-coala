import AppsIcon from '@mui/icons-material/Apps'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'

import { StyledMobilePlayerController, StyledMobilePlayerControllerButton } from './style'

interface PlayerControllerProps {
  prevAction?: (() => Promise<boolean>) | null
  nextAction?: (() => Promise<boolean>) | null
  menuAction: () => void
  style?: React.CSSProperties
}

export const PlayerController: React.FC<PlayerControllerProps> = ({
  menuAction,
  prevAction,
  nextAction,
  style,
}) => {
  return (
    <StyledMobilePlayerController style={style}>
      {prevAction && (
        <StyledMobilePlayerControllerButton onClick={prevAction}>
          <NavigateBeforeIcon />
          Aula anterior
        </StyledMobilePlayerControllerButton>
      )}
      <StyledMobilePlayerControllerButton onClick={menuAction}>
        <AppsIcon /> Módulos
      </StyledMobilePlayerControllerButton>
      {nextAction && (
        <StyledMobilePlayerControllerButton onClick={nextAction}>
          Próxima aula <NavigateNextIcon />
        </StyledMobilePlayerControllerButton>
      )}
    </StyledMobilePlayerController>
  )
}
