import { Box, Typography } from '@mui/material'

import { theme } from '@/theme'
import useMediaQuery from '@/hooks/useMediaQuery'

import { PaperButtonProps } from './types'

export const PaperButton = ({ isActive, text, icon: Icon, onClick }: PaperButtonProps) => {
  const color = isActive ? 'var(--mui-palette-primary-main)' : 'var(--mui-palette-grey-600)'
  const isSmallDevice = useMediaQuery('sm')

  return (
    <Box
      onClick={onClick}
      sx={{
        minHeight: theme.spacing(5),
        cursor: 'pointer',
        maxWidth: '180px',
        minWidth: '115px',
        flex: 1,
        display: 'flex',
        flexDirection: ['column', 'column', 'row'],
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid var(--mui-palette-grey-200)',
        borderRadius: 2,
        py: [1.5, 1.5, 0],
        gap: 0.5,
        ...(!isSmallDevice && {
          ':hover': {
            backgroundColor: 'var(--mui-palette-grey-100)',
          },
        }),
        ':active': {
          backgroundColor: 'var(--mui-palette-primary-light)',
        },
        ...(isActive && {
          backgroundColor: 'var(--mui-palette-primary-light)',
        }),
      }}
    >
      <Icon
        sx={{
          color,
          height: 16,
          width: 16,
          ...(isActive && {
            color: 'var(--mui-palette-primary-main)',
          }),
        }}
      />
      <Typography variant='h6' color={color} lineHeight={'100%'}>
        {text}
      </Typography>
    </Box>
  )
}
