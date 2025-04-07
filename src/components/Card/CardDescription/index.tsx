import { Box, Typography } from '@mui/material'

import { CDivider } from '@/v3/presentation/newComponents'

interface Props {
  title: string
  subtitle?: string | JSX.Element | null
}
export const CardDescription = ({ title, subtitle }: Props) => {
  return (
    <Box>
      <Typography
        variant='h5'
        sx={(theme) => ({
          color: theme.palette.grey[600],
        })}
      >
        {title}
      </Typography>
      <Typography
        variant='h5'
        sx={() => ({
          wordWrap: 'break-word',
        })}
      >
        {subtitle || 'Não informado'}
      </Typography>
      <Box mt={1} />
      <CDivider sx={{ borderBottomWidth: 2 }} />
    </Box>
  )
}

export default CardDescription
