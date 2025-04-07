import { Grid, GridProps, GridSpacing } from '@mui/material'
import React from 'react'

interface IGridWrapper extends GridProps {
  spacing?: GridSpacing
  children?: React.ReactNode
}

export const GridWrapper: React.FC<IGridWrapper> = ({ children, spacing, ...others }) => {
  return (
    <Grid spacing={spacing === undefined ? 2 : spacing} {...others} container>
      {children}
    </Grid>
  )
}

export default GridWrapper
