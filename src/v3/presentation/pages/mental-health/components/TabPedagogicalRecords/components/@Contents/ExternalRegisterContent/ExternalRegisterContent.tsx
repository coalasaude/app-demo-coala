import { Box, Typography } from '@mui/material'

import { useMutateAddMentalHealthRegisterDocument } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/documents/useMutateAddMentalHealthDocument'

import { ManageContentProps } from '../../../types/manage-content.type'

import { AddExternalRegisterForm } from './components/AddExternalRegisterForm/AddExternalRegisterForm'
import { EditExternalRegisterForm } from './components/EditExternalRegisterForm/EditExternalRegisterForm'

export const ExternalRegisterContent = ({ id, userId, onBackToRegisters }: ManageContentProps) => {
  const addDocument = useMutateAddMentalHealthRegisterDocument()
  const handleAsyncUpload = async (file: File) => {
    const document = await addDocument.mutateAsync({ file, userId, type: 'EXTERNAL_RECORD' })

    return document.id
  }

  return (
    <Box>
      <Typography variant='h4' mb={[3, 2]}>
        Registros externos
      </Typography>
      {!id && (
        <AddExternalRegisterForm
          onUpload={handleAsyncUpload}
          userId={userId}
          isUploading={addDocument.isPending}
          onFinish={onBackToRegisters}
        />
      )}
      {!!id && (
        <EditExternalRegisterForm
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
