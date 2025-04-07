import { Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledContainer = styled(Stack)`
  gap: ${({ theme }) => theme.spacing(1)};
  width: 100%;
  height: 100%;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.grey[300]};
    border-radius: 5px;
  }
`
