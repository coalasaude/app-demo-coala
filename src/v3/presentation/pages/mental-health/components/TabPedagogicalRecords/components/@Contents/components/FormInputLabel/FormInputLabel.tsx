import { Box, Typography } from '@mui/material'
import { ReactNode } from 'react'

type Props = {
  text: ReactNode
  input: ReactNode
}

export const FormInputLabel = ({ input, text }: Props) => {
  return (
    <Box>
      <Typography variant='h4' mb={1}>
        {text}
      </Typography>
      {input}
    </Box>
  )
}
