import { styled } from '@mui/material/styles'

export const StyledEmergencyButton = styled('div') <{ isOpen: boolean }>`
  align-items: center;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  border-radius: ${({ theme }) => theme.spacing(1)};
  border: 1px solid transparent;
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  cursor: pointer;
  display: flex;
  font-weight: 700;
  gap: ${({ theme }) => theme.spacing(1)};
  justify-content: center;
  min-height: 49px;
  transition: all 0.2s ease;
  width: 51vw;
  height: 7vh;

  &:hover {
    background-color: ${({ theme }) => theme.palette.secondary.dark};
  }
`
