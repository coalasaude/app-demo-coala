import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { Box, BoxProps } from '@mui/material'

export const AddIcconButton = (props: BoxProps) => {
  return (
    <Box
      {...props}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 32,
        borderRadius: '4px',
        background: 'white',
        color: 'var(--mui-palette-grey-600)',
        cursor: 'pointer',
        ':hover': {
          filter: 'brightness(0.9)',
        },
        ':active': {
          filter: 'brightness(0.8)',
        },
        ...props?.sx,
      }}
    >
      <AddOutlinedIcon sx={{ fontSize: 18, color: 'var(--mui-palette-grey-600)' }} />
    </Box>
  )
}
