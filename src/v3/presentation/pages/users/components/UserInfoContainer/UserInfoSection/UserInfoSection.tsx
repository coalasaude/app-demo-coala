import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Box, Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import ButtonIcon from '@/v3/presentation/components/ButtonIcon'

import { UserInfoSectionProps } from './type'

export const UserInfoSection = ({
  onEdit,
  title,
  variant = 'icon',
  buttonLabel = 'Adicionar',
  buttonIcon = <EditOutlinedIcon />,
  children,
  buttonVariant = 'outlined',
  ...props
}: UserInfoSectionProps) => {
  return (
    <Box {...props}>
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
        <Typography variant='h4'>{title}</Typography>
        {variant == 'icon' && onEdit && <ButtonIcon onClick={onEdit} icon={buttonIcon} />}
        {variant == 'text' && onEdit && (
          <Button
            sx={{ display: ['none', 'inherit'] }}
            variant={buttonVariant}
            size='small'
            onClick={onEdit}
          >
            {buttonLabel}
          </Button>
        )}
        {variant == 'text' && onEdit && (
          <Button
            sx={{ display: ['inherit', 'none'], minWidth: 32, minHeight: 32, p: 0 }}
            variant='outlined'
            size='small'
            onClick={onEdit}
          >
            <AddIcon sx={{ color: 'var(--mui-palette-primary-main)', width: 16, height: 16 }} />
          </Button>
        )}
      </Box>
      {children}
    </Box>
  )
}
