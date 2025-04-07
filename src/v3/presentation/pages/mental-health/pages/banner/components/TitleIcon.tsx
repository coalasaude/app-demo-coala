import { Box, Typography } from '@mui/material'

export const TitleIcon: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        mt: '4px',
        borderRadius: '8px',
        height: ['40px', '40px', '60px'],
        width: ['40px', '40px', '60px'],
        minHeight: ['40px', '40px', '60px'],
        minWidth: ['40px', '40px', '60px'],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography fontSize={[21, 21, 31]}>🧠</Typography>
    </Box>
  )
}
