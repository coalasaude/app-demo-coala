import { Box } from '@mui/material'

import { CInputControlled } from '@/v3/presentation/newComponents'
import { FormButtons } from '@/v3/presentation/components/FormButtons'

interface ReplyCommentInputProps {
  onConfirm: () => void
  onCancel: () => void
  name: string
}

const CommentInputControlled = ({ onConfirm, onCancel, name }: ReplyCommentInputProps) => {
  return (
    <Box display='flex' flexDirection='column' gap={1}>
      <CInputControlled name={name} placeholder='Escreva seu comentário' label='' />
      <FormButtons
        confirmLabel='Enviar'
        cancelLabel='Cancelar'
        buttonProps={{ size: 'small' }}
        alignSelf='flex-end'
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </Box>
  )
}

export default CommentInputControlled
