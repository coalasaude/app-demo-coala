import { Stack } from '@mui/material'

import { CSelectControlled } from '@/components/Forms'
import { useFetchBrowseReportProfiles } from '@/v3/presentation/hooks/api/@v2/mental-health/reports/useFetchBrowseReportProfiles'
import { CInputControlled, CTextAreaControlled } from '@/v3/presentation/newComponents'
import { CFileInputAsyncControlled } from '@/v3/presentation/newComponents/implementations/form/CFileInputAsyncControlled'
import { medicalProfileTypesTranslatedMap } from '@/v3/presentation/pages/mental-health/constants/medicalProfileTypesTranslatedMap'

import { FormContainer } from '../../../components/FormContainer/FormContainer'
import { FormInputLabel } from '../../../components/FormInputLabel/FormInputLabel'

type Props = {
  onAdd?: () => void
  onDelete?: () => void
  onUpload: (file: File) => Promise<number>
  prefix?: string
}

export const ExternalRegisterForm = ({ prefix = '', onAdd, onDelete, onUpload }: Props) => {
  const { profiles } = useFetchBrowseReportProfiles()

  const title = onAdd ? 'Adicionar registro externo' : 'Editar registro externo'
  const selectProfiles = profiles?.data.map((profile) => ({
    value: profile.id,
    label: medicalProfileTypesTranslatedMap[profile.name],
  }))

  return (
    <Stack maxWidth={650}>
      <FormContainer title={title} onAdd={onAdd} onDelete={onDelete}>
        <FormInputLabel
          text='Título*'
          input={
            <CInputControlled
              label=''
              sx={{ mb: 1.5 }}
              name={prefix + 'title'}
              placeholder='Digite aqui'
              fullWidth
            />
          }
        />
        <FormInputLabel
          text='Nome do profissional*'
          input={
            <CInputControlled
              label=''
              sx={{ mb: 1.5 }}
              name={prefix + 'professionalName'}
              placeholder='Digite aqui'
              fullWidth
            />
          }
        />

        <FormInputLabel
          text='Selecione o tipo de profissional*'
          input={
            <CSelectControlled
              name={prefix + 'professionalTypeId'}
              label=''
              placeholder='Selecione aqui'
              sx={{ mb: 1.5 }}
              disabledNullOption
              fullWidth
              options={selectProfiles}
            />
          }
        />

        <FormInputLabel
          text='Número de registro do profissional*'
          input={
            <CInputControlled
              label=''
              sx={{ mb: 1.5 }}
              name={prefix + 'professionalRegister'}
              placeholder='Digite aqui'
              fullWidth
            />
          }
        />
        <FormInputLabel
          text='Descrição do registro*'
          input={
            <CTextAreaControlled
              label=''
              sx={{ mb: 1.5 }}
              name={prefix + 'description'}
              placeholder='Descreva o que deseja registrar'
              fullWidth
            />
          }
        />
        <FormInputLabel
          text='Arquivo'
          input={
            <CFileInputAsyncControlled
              name={prefix + 'document'}
              placeholder='Selecione um arquivo '
              label=''
              accept='.pdf, image/*'
              onUploadFunc={onUpload}
            />
          }
        />
      </FormContainer>
    </Stack>
  )
}
