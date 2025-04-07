import { ButtonBase } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledCMenuPanelContainer = styled(ButtonBase)<{
  isSelected?: boolean
  color: string
  isSmall: boolean
}>`
  width: 100%;
  background: ${({ theme, isSelected }) =>
    isSelected ? theme.palette.primary.main : theme.palette.primary.light};
  display: flex;
  align-items: center;
  justify-content: ${({ isSmall }) => (isSmall ? 'center' : 'flex-start')};
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(1)};
  gap: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.spacing(0.5)};
  color: ${({ color }) => color};
  margin-bottom: ${({ theme }) => theme.spacing(1)};

  svg {
    width: ${({ theme }) => theme.spacing(4)};
    height: ${({ theme }) => theme.spacing(4)};
    fill: ${({ color }) => color};
  }
`
