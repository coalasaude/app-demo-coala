import { Box } from '@mui/material'
import { styled, css } from '@mui/material/styles'

export const StyledSelectCard = styled(Box)<{ isSelected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.palette.background.default};
  min-height: 110px;
  width: 100px;
  border-radius: 14px;
  cursor: pointer;

  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      background: ${theme.palette.primary.light};
    `}
`
