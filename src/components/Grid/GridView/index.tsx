import React from 'react'
import { GridProps, Typography } from '@mui/material'

import { Container, Content } from './styles'

export interface IItem {
  xl?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  xs: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  md?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  lg?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  sm?: boolean | 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  title?: string
  children: React.ReactNode
}
export const GridView: React.FC<IItem & GridProps> = ({
  children,
  xl,
  xs,
  md,
  lg,
  sm,
  title,
  ...gridProps
}) => {
  return (
    <Container item xs={xs} sm={sm} lg={lg} xl={xl} md={md} {...gridProps}>
      <Content>
        {title && (
          <Typography color='var(--mui-palette-grey-700)' display='block'>
            <small>{title}</small>
          </Typography>
        )}
        {children}
      </Content>
    </Container>
  )
}

export default GridView
