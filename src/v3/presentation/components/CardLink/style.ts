import styled from 'styled-components'
import { Button } from '@mui/material'

export const StyledButton = styled(Button)<{ isActive: boolean }>`
  border-radius: 10px !important;
  color: var(--mui-palette-grey-600) !important;
  background-color: transparent !important;

  p {
    color: var(--mui-palette-grey-600) !important;
  }

  ${(props) =>
    props.isActive &&
    `
    color: var(--mui-palette-primary-main) !important;
    background-color: transparent !important;

    .MuiSvgIcon-root {
      color: var(--mui-palette-primary-main);
    }

    p {
      color: var(--mui-palette-primary-main) !important;
    }
  
  `}
`
