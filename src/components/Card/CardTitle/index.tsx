import { Typography } from '@mui/material'
import React, { ReactNode } from 'react'

interface Props {
  title: ReactNode
}
export const CardTitle = ({ title }: Props) => {
  return (
    <Typography
      variant='h4'
      sx={(theme) => ({
        color: theme.palette.primary.main,
      })}
    >
      {title}
    </Typography>
  )
}

export default CardTitle
