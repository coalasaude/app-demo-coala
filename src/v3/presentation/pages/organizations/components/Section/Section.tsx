import { Box, Stack } from '@mui/material'

import { Title } from '../Title'

type SectionProps = {
  title: string
  children: React.ReactNode[] | React.ReactNode
  gap?: number
}

export const Section = ({ title, children, gap }: SectionProps) => {
  return (
    <Box>
      <Title>{title}</Title>

      <Stack gap={gap ?? 2}>{children}</Stack>
    </Box>
  )
}
