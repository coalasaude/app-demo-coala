import { Switch as MSwitch, SwitchProps } from '@mui/material'

import { Container } from './styles'

type Props = SwitchProps & {
  label?: string
  value: boolean
  onChange: (value: boolean) => void
  side?: 'left' | 'right'
}

export function Switch({ label, side, value, onChange, onBlur, ...props }: Props) {
  side = side || 'right'

  return (
    <Container>
      {side === 'left' && label}
      <MSwitch
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        onBlur={onBlur}
        {...props}
      />
      {side === 'right' && label}
    </Container>
  )
}
