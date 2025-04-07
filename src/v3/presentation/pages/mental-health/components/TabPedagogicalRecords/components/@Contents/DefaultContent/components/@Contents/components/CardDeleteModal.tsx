import { Box, Typography } from '@mui/material'
import { useState } from 'react'

import { FormButtons } from '@/v3/presentation/components/FormButtons'
import { ModalCard, useModalContext } from '@/v3/presentation/components/Modal'

type CardDeleteModalProps = {
  onConfirm: () => Promise<void>
}

export function CardDeleteModal({ onConfirm }: CardDeleteModalProps) {
  const { handleModal } = useModalContext()
  const [isLoading, setIsLoading] = useState(false)

  const onClose = () => {
    handleModal()
  }

  const handleConfirm = () => {
    setIsLoading(true)
    onConfirm().finally(() => {
      setIsLoading(false)
      onClose()
    })
  }

  return (
    <ModalCard title='Excluir' sx={{ width: ['100%', 385] }}>
      <Box mt={2}>
        <Typography variant='body1'>
          Tem certeza que deseja <b>excluir</b> esse registro?
        </Typography>
        <FormButtons
          display='flex'
          mt={[3, 4]}
          gap={1}
          justifyContent='flex-end'
          confirmLabel='Sim'
          onConfirm={handleConfirm}
          cancelLabel={'Não'}
          isLoading={isLoading}
          disableConfirm={false}
          onCancel={onClose}
          minWidth={80}
        />
      </Box>
    </ModalCard>
  )
}
