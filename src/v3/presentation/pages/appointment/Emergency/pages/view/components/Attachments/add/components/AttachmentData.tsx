import { Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { GridItem, GridWrapper } from '@/components/Grid'
import { maxLength } from '@/components/Forms/normalizers/maxLengthNormalizer'
import { CBaseContainer, CInputControlled } from '@/v3/presentation/newComponents'
import { CFileInputControlled } from '@/v3/presentation/newComponents/implementations/form/CFileInputControlled'

interface AttachmentDataProps {
  isPending?: boolean
}

export const AttachmentData = ({ isPending = false }: AttachmentDataProps) => {
  const router = useRouter()

  return (
    <CBaseContainer
      title='Anexos'
      isLoading={isPending}
      buttonLabel='Registrar'
      onCancel={() => router.back()}
    >
      <GridWrapper>
        <GridItem py={2} xs={12}>
          <CInputControlled
            placeholder='Digite o nome do anexo'
            name='title'
            variant='outlined'
            label='Nome do anexo'
            transform={{ output: [maxLength(150)] }}
          />
        </GridItem>
        <GridItem py={2} xs={12}>
          <Typography variant='h3'>Arquivos</Typography>
        </GridItem>
        <GridItem py={2} xs={12}>
          <CFileInputControlled
            accept='.jpeg,.jpg,.png,.jpe,.bmp,.pdf'
            name='file'
            label='Selecione um documento relacionado'
          />
        </GridItem>
      </GridWrapper>
    </CBaseContainer>
  )
}

export default AttachmentData
