import { styled } from '@mui/material/styles'

export const InstitutionButton = styled('div')<{ isSelected?: boolean }>`
  color: ${({ theme }) => theme.palette.primary.main};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 50px;
  font-weight: bold;
  position: relative;
  padding: 8px;

  &:hover {
    background: ${({ theme }) => theme.palette.primary.light};
  }

  ${({ isSelected, theme }) =>
    isSelected &&
    `
    background: ${theme.palette.common.white};
    color: ${theme.palette.primary.main};
    font-weight: bold;
    border: 2px solid ${theme.palette.primary.main}
  `}
`

export const NotificationText = styled('div')`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 0.875rem;
`
