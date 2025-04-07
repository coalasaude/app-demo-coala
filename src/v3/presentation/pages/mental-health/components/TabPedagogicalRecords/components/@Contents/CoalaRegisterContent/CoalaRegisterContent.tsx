import { Box, Typography } from '@mui/material'

import { useMutateAddMentalHealthRegisterDocument } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/documents/useMutateAddMentalHealthDocument'

import { ManageContentProps } from '../../../types/manage-content.type'

import { AddCoalaRegisterForm } from './components/AddCoalaRegisterForm/AddCoalaRegisterForm'
import { EditCoalaRegisterForm } from './components/EditCoalaRegisterForm/EditCoalaRegisterForm'

export const CoalaRegisterContent = ({ id, userId, onBackToRegisters }: ManageContentProps) => {
  const addDocument = useMutateAddMentalHealthRegisterDocument()
  const handleAsyncUpload = async (file: File) => {
    const document = await addDocument.mutateAsync({ file, userId, type: 'INTERN_RECORD' })

    return document.id
  }

  return (
    <Box>
      <Typography variant='h4' mb={[3, 2]}>
        Registros da Coala
      </Typography>
      {!id && (
        <AddCoalaRegisterForm
          onUpload={handleAsyncUpload}
          isUploading={addDocument.isPending}
          userId={userId}
          onFinish={onBackToRegisters}
        />
      )}
      {!!id && (
        <EditCoalaRegisterForm
          onUpload={handleAsyncUpload}
          isUploading={addDocument.isPending}
          id={id}
          userId={userId}
          onFinish={onBackToRegisters}
        />
      )}
    </Box>
  )
}
