import { SvgIconComponent } from '@mui/icons-material'
import { ReactNode, MouseEvent } from 'react'

export interface PaperButtonProps {
  isActive?: boolean
  text: ReactNode
  icon: SvgIconComponent
  onClick?: (e: MouseEvent<any>) => void
}
