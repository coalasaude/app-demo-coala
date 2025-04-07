import { Box } from '@mui/material'

type Props = {
  children: React.ReactNode
  mt?: number
}

export const BaseFormData = ({ children, mt = 3 }: Props) => {
  return (
    <Box mt={mt} mb={2}>
      <Box display='flex' flexDirection='column' gap={3} width='100%' alignItems='center'>
        {children}
      </Box>
    </Box>
  )
}
