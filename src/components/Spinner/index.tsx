import { CircularProgress, Fade } from '@mui/material'
import { useEffect } from 'react'

import { PageSpinnerWrapper } from './styles'

export const PageSpinner = ({ isVisible }: { isVisible: boolean }) => {
  useEffect(() => {
    const element = document.getElementsByTagName('html')[0]
    if (!element) return
    if (isVisible) {
      element.style.overflow = 'hidden'
      return
    }
    element.style.overflow = 'auto'
  }, [isVisible])

  if (!isVisible) return null

  return (
    <Fade in={isVisible}>
      <PageSpinnerWrapper id='pagespinner'>
        <CircularProgress />
      </PageSpinnerWrapper>
    </Fade>
  )
}
