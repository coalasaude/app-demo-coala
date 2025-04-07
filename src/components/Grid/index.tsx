import { Grid as MGrid, GridProps } from '@mui/material'
import React from 'react'

interface IGrid extends GridProps {
  children?: React.ReactNode
}
export const GridItem: React.FC<IGrid> = ({ children, ...others }) => {
  return (
    <MGrid {...others} item>
      {children}
    </MGrid>
  )
}

export * from './GridWrapper'
export * from './GridView'
