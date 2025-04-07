import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledWrapper = styled(Button)`
  svg {
    margin-right: ${({ theme }) => theme.spacing(1)};
    width: 18px;
    color: 'var(--mui-palette-primary-main)'
  }
`
