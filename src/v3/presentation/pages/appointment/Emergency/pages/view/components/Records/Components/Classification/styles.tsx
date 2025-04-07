import { Stack, StackProps } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledContainer = styled((props: StackProps) => <Stack {...props} />)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: theme.spacing(0.5),
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
}))

export const StyledPill = styled((props: StackProps) => <Stack {...props} />)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: theme.spacing(1),
}))
