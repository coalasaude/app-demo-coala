import { Tabs } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTabList = styled(Tabs)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[200]};
  width: 100%;

  .Mui-selected.MuiTab-root {
    font-weight: bold;
    color: ${({ theme }) => theme.palette.primary.main};
  }
`
