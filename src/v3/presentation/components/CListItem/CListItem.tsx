import { Typography } from '@mui/material'

import TrashIcon from '/public/assets/svg/TrashIcon.svg'

import { CardContent } from '@/v3/presentation/components/Cards/CardContent'

import { DeleteButton } from './styles'

type CListItemProps = {
  content: string
  deleteButton?: boolean

  onClick?: () => void
  onDelete?: () => void
}

export const CListItem = ({ content, deleteButton, onClick, onDelete }: CListItemProps) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    onClick && onClick()
  }

  return (
    <CardContent
      sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      onClick={handleClick}
    >
      <Typography variant='h5'>{content}</Typography>

      {deleteButton && (
        <DeleteButton onClick={onDelete}>
          <TrashIcon />
        </DeleteButton>
      )}
    </CardContent>
  )
}
