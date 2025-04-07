import { Box, Typography } from '@mui/material'

export const TitleIcon: React.FC<{ isModal?: boolean }> = ({ isModal }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        mt: '4px',
        borderRadius: '8px',
        height: isModal ? '24px' : '34px',
        width: isModal ? '24px' : '34px',
        minHeight: isModal ? '24px' : '34px',
        minWidth: isModal ? '24px' : '34px',
        display: [
          isModal ? 'flex' : 'none',
          isModal ? 'flex' : 'none',
          isModal ? 'flex' : 'none',
          'flex',
        ],
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography fontSize={isModal ? 13 : 22}>🧠</Typography>
    </Box>
  )
}
