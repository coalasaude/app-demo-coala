import { Box, BoxProps } from '@mui/material'

import { SectionTitle } from './styles'

interface Props extends BoxProps {
  content: string
  icon?: React.ReactNode
}

export const Title = ({ content, icon, ...props }: Props) => {
  return (
    <Box display='flex' justifyContent='space-between' {...props}>
      <SectionTitle>{content}</SectionTitle>
      {icon}
    </Box>
  )
}
