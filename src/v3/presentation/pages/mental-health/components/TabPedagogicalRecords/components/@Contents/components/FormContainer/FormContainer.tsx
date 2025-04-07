import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { Box, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'

import ButtonIcon from '@/v3/presentation/components/ButtonIcon'
type Props = {
  children: ReactNode
  title: string
  onAdd?: () => void
  onDelete?: () => void
}

export const FormContainer = ({ children, title, onAdd, onDelete }: Props) => {
  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: 2,
        border: '1px solid var(--mui-palette-grey-200)',
      }}
    >
      <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center' mb={1}>
        <Typography variant='h4'>{title}</Typography>
        {onAdd && (
          <ButtonIcon
            sx={{
              border: '1px solid var(--mui-palette-primary-main)',
              borderRadius: 2,
              height: 28,
              width: 28,
            }}
            icon={
              <AddOutlinedIcon sx={{ fontSize: 18, color: 'var(--mui-palette-primary-main)' }} />
            }
            onClick={onAdd}
          />
        )}
        {onDelete && (
          <ButtonIcon
            sx={{
              height: 28,
              width: 28,
            }}
            icon={<DeleteOutlinedIcon sx={{ fontSize: 18 }} />}
            onClick={onDelete}
          />
        )}
      </Stack>
      {children}
    </Box>
  )
}
