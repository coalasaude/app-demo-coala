import { BadgeProps, IconButton } from '@mui/material'
import Badge from '@mui/material/Badge'

type CBadgeStates =
  | 'disabled'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'emergency'

export interface CBadgeProps extends BadgeProps {
  type: 'small' | 'medium' | 'large'
  state: CBadgeStates
  children: React.ReactNode
}

export const CBadge = ({ state, type, children, ...props }: CBadgeProps) => {
  const colorDictionary: Record<CBadgeStates, string> = {
    disabled: 'var(--mui-palette-Button-inheritContainedBg)',
    primary: 'var(--mui-palette-primary-main)',
    secondary: 'var(--mui-palette-secondary-main)',
    success: 'var(--mui-palette-success-main)',
    error: 'var(--mui-palette-error-main)',
    warning: 'var(--mui-palette-warning-main)',
    info: 'var(--mui-palette-info-main)',
    emergency: 'var(--mui-palette-emergency-main)',
  }
  return (
    <IconButton sx={{ position: 'relative' }} disabled={state === 'disabled'}>
      <Badge
        sx={{
          '.MuiBadge-badge': {
            backgroundColor: colorDictionary[state],
            color: 'var(--mui-palette-primary-contrastText)',
          },
        }}
        {...props}
        variant={type === 'small' ? 'dot' : 'standard'}
        max={type === 'medium' ? 9 : type === 'large' ? 99 : 0}
      >
        {children}
      </Badge>
    </IconButton>
  )
}
