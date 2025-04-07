import { BoxProps } from '@mui/material'
import { useEffect } from 'react'

import { WhiteContent as WhiteContentBody } from './styles'

export const WhiteContent = ({ children, ...props }: BoxProps) => {
  useEffect(() => {
    const container = document.getElementById('container')
    if (container) {
      container.style.background = 'white'
    }
    return () => {
      if (container) {
        container.removeAttribute('style')
      }
    }
  })
  return <WhiteContentBody {...props}>{children}</WhiteContentBody>
}
