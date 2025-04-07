import { Typography, TypographyProps } from '@mui/material'

export type StepContainerTitleProps = TypographyProps
export const StepContainerTitle = ({ children, ...props }: StepContainerTitleProps) => {
  return (
    <Typography
      mx={['auto', 'auto', '0px']}
      textAlign={['center', 'center', 'start']}
      mb={2}
      {...props}
    >
      {children}
    </Typography>
  )
}
