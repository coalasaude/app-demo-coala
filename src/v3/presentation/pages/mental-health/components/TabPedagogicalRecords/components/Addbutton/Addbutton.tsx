import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { Box, Typography } from '@mui/material'

export const Addbutton = ({
  text,
  onClick,
  active,
}: {
  text: string
  onClick: () => void
  active?: boolean
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        height: 56,
        borderRadius: '8px',
        display: 'flex',
        px: '20px',
        alignItems: 'center',
        backgroundColor: 'var(--mui-palette-primary-light)',
        color: 'var(--mui-palette-primary-main)',
        cursor: 'pointer',
        ':hover': {
          filter: 'brightness(0.9)',
        },
        ':active': {
          filter: 'brightness(0.8)',
        },

        ...(active && {
          color: 'white',
          backgroundColor: 'var(--mui-palette-primary-main)',
        }),
      }}
    >
      <AddCircleOutlineOutlinedIcon color='inherit' sx={{ fontSize: 18, mr: 1.5 }} />
      <Typography variant='h5' color='inherit' sx={{ userSelect: 'none' }}>
        {text}
      </Typography>
    </Box>
  )
}
