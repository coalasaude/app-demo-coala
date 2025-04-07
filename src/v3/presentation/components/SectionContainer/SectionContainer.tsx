import { Box } from '@mui/material'
import { ReactNode, isValidElement, useMemo } from 'react'

interface SectionContainerProps {
  activeStep: string | number
  children: ReactNode[]
}

export const SectionContainer = ({ children, activeStep }: SectionContainerProps) => {
  const child = useMemo(() => {
    return (
      children.find((child, index) => {
        if (isValidElement(child)) {
          return child.key != undefined ? child.key === activeStep : index === activeStep
        }
        return false
      }) || children[0]
    )
  }, [children, activeStep])

  return <Box>{child}</Box>
}
