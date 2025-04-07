import { BoxProps } from '@mui/material'

import { spacing } from '@/utils/spacing'

import { CardBodyContainer } from './styles'

type CardBodyProps = BoxProps

export const CardBody = ({ children, gap = spacing(2), p = 2, ...props }: CardBodyProps) => {
  return (
    <CardBodyContainer gap={gap} p={p} {...props}>
      {children}
    </CardBodyContainer>
  )
}
