import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'

type CProgressBarStates = 'default' | 'low' | 'medium' | 'great'

export interface CProgressBarProps extends LinearProgressProps {
  state: CProgressBarStates
  value: number
}

export const CProgressBar = ({ state, ...props }: CProgressBarProps) => {
  const colorDictionary: Record<CProgressBarStates, string> = {
    default: 'var(--mui-palette-primary-main)',
    low: 'var(--mui-palette-error-main)',
    medium: 'var(--mui-palette-warning-main)',
    great: 'var(--mui-palette-success-main)',
  }
  return (
    <LinearProgress
      variant='determinate'
      {...props}
      sx={{
        width: '100%',
        height: '6px',
        ...props.sx,
        '.MuiLinearProgress-bar': {
          backgroundColor: colorDictionary[state],
        },
      }}
    />
  )
}
