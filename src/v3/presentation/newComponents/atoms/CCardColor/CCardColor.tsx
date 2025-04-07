import { Box, BoxProps } from '@mui/material'

type CCardColorStates = 'success' | 'error' | 'warning' | 'info'

type Props = {
  state: CCardColorStates
  children: React.ReactNode
  boxProps?: BoxProps
}

export const CCardColor = ({ state, children, boxProps }: Props) => {
  const colorDictionary: Record<CCardColorStates, string> = {
    success: 'var(--mui-palette-success-light)',
    error: 'var(--mui-palette-error-light)',
    warning: 'var(--mui-palette-warning-light)',
    info: 'var(--mui-palette-info-light)',
  }

  return (
    <Box bgcolor={colorDictionary[state]} p={1} borderRadius={2} {...boxProps}>
      {children}
    </Box>
  )
}
