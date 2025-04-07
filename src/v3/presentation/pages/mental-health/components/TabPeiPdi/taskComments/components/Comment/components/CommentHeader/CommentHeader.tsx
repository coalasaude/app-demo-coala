import { Box, Typography } from '@mui/material'

interface CommentHeaderProps {
  name: string
  createdAt: string
}

const CommentHeader = ({ name, createdAt }: CommentHeaderProps) => {
  return (
    <Box display='flex' alignItems='baseline'>
      <Typography
        variant='h6'
        fontWeight={700}
        width={[75, 90]}
        whiteSpace='nowrap'
        overflow='hidden'
        textOverflow='ellipsis'
      >
        {name}
      </Typography>
      <Typography variant='overline' color='var(--mui-palette-grey-500)' ml={2}>
        {createdAt}
      </Typography>
    </Box>
  )
}

export default CommentHeader
