import React from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography'

export interface PageTitleProps extends Omit<TypographyProps, 'variant'> {
  children?: React.ReactNode
  component?: React.ElementType
}

const PageTitle: React.FC<PageTitleProps> = ({ children, ...props }) => (
  <Typography variant='h1' component='h1' {...props}>
    {children}
  </Typography>
)

export default PageTitle
