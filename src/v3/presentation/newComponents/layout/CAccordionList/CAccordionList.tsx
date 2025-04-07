import { Grid } from '@mui/material'
import React from 'react'

export interface CAccordionListProps<ItemProps> {
  numColumnsDesktop?: number
  numColumnsMobile?: number
  options: (ItemProps & { id?: any })[]
  renderItem: (option: ItemProps, index: number) => JSX.Element
}

export const CAccordionList = <ItemProps,>({
  numColumnsDesktop = 1,
  numColumnsMobile = 1,
  options,
  renderItem,
}: CAccordionListProps<ItemProps>) => {
  return (
    <Grid container spacing={2}>
      {options.map((option, index) => (
        <Grid item xs={12 / numColumnsMobile} sm={12 / numColumnsDesktop} key={option?.id || index}>
          {renderItem(option, index)}
        </Grid>
      ))}
    </Grid>
  )
}
