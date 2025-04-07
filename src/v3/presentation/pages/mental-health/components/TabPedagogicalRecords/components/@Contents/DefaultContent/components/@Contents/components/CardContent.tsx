import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import { Box, Menu, MenuItem, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useState } from 'react'

import { AppFileModel } from '@/v3/domain/@v2/@shared/app-file.model'
import ButtonIcon from '@/v3/presentation/components/ButtonIcon'
import { useModalContext } from '@/v3/presentation/components/Modal'

import { CardDeleteModal } from './CardDeleteModal'
import { CardDisplayContent } from './CardDisplayContent'
import { CardDisplayProfessionalContent } from './CardDisplayProfessionalContent'

type CardContentProps = {
  title: string
  createdAt: Date
  textLabel?: string
  text?: string
  secondTextLabel?: string
  secondText?: string
  file?: AppFileModel
  withProfessional?: boolean
  description?: string
  descriptionLabel: string
  onEdit: () => void
  onDelete: () => Promise<void>
}
export const CardContent = ({
  textLabel,
  text,
  secondText,
  secondTextLabel,
  description,
  descriptionLabel,
  createdAt,
  title,
  file,
  withProfessional,
  onDelete,
  onEdit,
}: CardContentProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { handleModal } = useModalContext()

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleEdit = () => {
    handleClose()
    onEdit()
  }

  const handleDelete = () => {
    handleClose()
    handleModal(<CardDeleteModal onConfirm={onDelete} />, {})
  }

  const open = Boolean(anchorEl)

  return (
    <Box
      sx={{
        border: '1px solid var(--mui-palette-grey-200)',
        borderRadius: 2,
        px: 2,
        pt: 1,
        pb: 2,
      }}
    >
      <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={2}>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Typography fontSize={16} fontWeight='bold'>
            {title}
          </Typography>
          <Typography variant='body2' color='var(--mui-palette-grey-500)' minWidth='fit-content'>
            Adicionado em {dayjs(createdAt).format('DD/MM/YYYY')}
          </Typography>
        </Stack>
        <Box mb={-1} mt={-1.5} mr={-1.5} ml='auto'>
          <ButtonIcon icon={<MoreVertOutlinedIcon sx={{ fontSize: 18 }} />} onClick={handleClick} />
          <Menu
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleDelete}>Excluir</MenuItem>
            <MenuItem
              onClick={handleEdit}
              sx={{ minWidth: 120, borderBottom: '1px solid var(--mui-palette-grey-100)' }}
            >
              Editar
            </MenuItem>
          </Menu>
        </Box>
      </Stack>
      {withProfessional ? (
        <CardDisplayProfessionalContent
          textLabel={textLabel}
          text={text}
          secondTextLabel={secondTextLabel}
          secondText={secondText}
          file={file}
          description={description}
          descriptionLabel={descriptionLabel}
        />
      ) : (
        <CardDisplayContent
          textLabel={textLabel}
          text={text}
          description={description}
          descriptionLabel={descriptionLabel}
        />
      )}
    </Box>
  )
}
