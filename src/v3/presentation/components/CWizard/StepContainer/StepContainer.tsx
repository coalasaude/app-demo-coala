import { JSXElementConstructor, ReactNode } from 'react'
import { Box, GridProps } from '@mui/material'

import { GridItem, GridWrapper } from '@/components/Grid'

export type StepContainerProps = {
  children: ReactNode
  svg: JSXElementConstructor<any>
  proportion?: `${number}/${number}`
  spacingDesk?: number | string
  maxWidth?: string
  py?: number
  px?: number
  gridProps?: Partial<GridProps>
}

export const StepContainer = ({
  children,
  svg: Svg,
  proportion = '6/6',
  spacingDesk = 2,
  maxWidth = '900px',
  gridProps,
  px,
  py,
}: StepContainerProps) => {
  const [left, right] = proportion.split('/').map(Number)

  return (
    <GridWrapper
      spacing={0}
      py={py === undefined ? 12 : py}
      px={px === undefined ? 2 : px}
      alignItems='center'
      maxWidth={maxWidth}
      mx='auto'
    >
      <GridItem pr={[0, , spacingDesk]} pb={[2, , 0]} xs={12} md={left} position='relative'>
        <Svg width='100%' />
      </GridItem>
      <GridItem xs={12} md={right} pr={[undefined, undefined, 5]} {...gridProps}>
        <Box>{children}</Box>
      </GridItem>
    </GridWrapper>
  )
}
