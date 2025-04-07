import { SvgIconComponent } from '@mui/icons-material'
import { ReactNode } from 'react'

export interface PaperLinkButtonProps {
  isActive?: boolean
  text: ReactNode
  icon: SvgIconComponent
  href: string
}
