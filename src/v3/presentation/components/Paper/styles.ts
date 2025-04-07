import { Box } from '@mui/material'
import styled from 'styled-components'

export const StyledPaper = styled(Box)<{ noBorder?: boolean }>`
  border-radius: 8px;
  border: ${(props) => (props.noBorder ? 'none' : '1px solid var(--mui-palette-grey-200)')};
  background: #fff;
`
