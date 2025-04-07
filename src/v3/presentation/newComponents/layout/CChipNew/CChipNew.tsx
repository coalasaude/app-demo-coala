import { Box, BoxProps } from '@mui/material'

export const CChipNew = (boxProps: BoxProps) => {
  return (
    <Box
      position='absolute'
      fontSize='6px'
      top='6px'
      right='2px'
      zIndex={1}
      {...boxProps}
      sx={{
        backgroundColor: 'var(--mui-palette-secondary-main)',
        borderRadius: '4px',
        padding: '2px',
        display: 'flex',
        fontSize: '8px',
        alignItems: 'center',
        '@keyframes colorChange': {
          '0%': {
            color: '#FFFFFF',
          },
          '100%': {
            color: 'black',
          },
        },
        animation: 'colorChange 1s infinite',
        ...boxProps.sx,
      }}
    >
      NEW
    </Box>
  )
}
