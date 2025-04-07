import { Tooltip } from '@mui/material'
import { ReactNode } from 'react'

export type CTooltipProps = {
  children: React.ReactElement<any, any>
  description: ReactNode
  placement?: 'bottom' | 'right' | 'left' | 'top'
}

export const CTooltip = ({ children, description, placement = 'bottom' }: CTooltipProps) => {
  return (
    <Tooltip title={description} placement={placement} arrow enterTouchDelay={0}>
      {children}
    </Tooltip>
  )
}
