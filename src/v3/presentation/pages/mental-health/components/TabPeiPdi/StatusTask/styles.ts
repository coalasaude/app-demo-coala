import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledStatus = styled(Box)(({ theme }) => ({
  width: 160,
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius,
  padding: `${theme.spacing(1)} 0`,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
}))
