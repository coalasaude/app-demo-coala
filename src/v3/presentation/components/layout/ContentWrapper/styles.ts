import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const ContentWrapper = styled(Box)<{ disableContentPadding?: boolean }>`
  ${({ disableContentPadding, theme }) =>
    !disableContentPadding &&
    `
    padding:  ${theme.spacing(2)};
  `}
`
