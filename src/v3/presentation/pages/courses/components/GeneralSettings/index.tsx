import { Box, Button, Typography } from '@mui/material'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { Controller, useForm } from 'react-hook-form'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import React, { useEffect, useMemo, useState } from 'react'
import Router from 'next/router'

import { CDivider } from '@/v3/presentation/newComponents'
import { CForm, CSelectControlled } from '@/components/Forms'
import { CRadioButtonGroupControlled } from '@/v3/presentation/newComponents'
import { GridItem, GridWrapper } from '@/components/Grid'
import { DefaultStatus } from '@/v3/domain/api/ApiCourseResponse'
import { useLayout } from '@/hooks/useLayout'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { useMutateCourse } from '@/v3/presentation/hooks/useMutateCourse'
import { NEW_ROUTES } from '@/constants/routes'
import { useFetchProfiles } from '@/v3/presentation/hooks/api/profile/useFetchProfiles'
import { Profile } from '@/v3/domain/Profile'
import CChip from '@/v3/presentation/newComponents/atoms/CChip'
import CSwitch from '@/v3/presentation/newComponents/atoms/CSwitch'
import CFileInput from '@/v3/presentation/newComponents/molecules/CFileInput'

import { StyledOnlyDesktop } from '../../pages/quiz/style'
import ConfirmationModal from '../ConfirmationModal'
import { downloadFile } from '../../utils/downloadFile'

import {
  ExampleFileContainer,
  StyledCInput,
  StyledDeleteWrapper,
  StyledFooterActions,
  StyledSelect,
  StyledWrapperButtons,
} from './style'

interface IForm {
  title: string
  certificateValidity: string
  benefits: string
  isPublished: boolean
  haveCertificate: string
  certificatePreview: string
  profiles: number[]
}

interface GeneralSettingsProps {
  haveCertificatePreview?: boolean
  onUpdate: (data: any) => void
  changeTabOnSave?: () => void
  course?: {
    status?: DefaultStatus
    title: string
    id?: number
    isPublished: boolean
    profiles?: Profile[]
    certificateValidity?: string
  }
}

interface FileState {
  csvCourse?: File | null
  csvQuestions?: File | null
  image?: File | null
}

const courseCSVLink =
  'https://coalasaude.s3.amazonaws.com/templates/CSV+Curso+-+Curso_M%C3%B3dulo_Aula.csv'
const questionsCSVLink =
  'https://coalasaude.s3.amazonaws.com/templates/CSV+Curso+-+Quest%C3%B5es.csv'

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  haveCertificatePreview,
  onUpdate,
  course,
  changeTabOnSave,
}) => {
  const [files, setFiles] = useState<FileState>({})
  const { showSnackBar } = useLayout()
  const { handleModal } = useModalContext()
  const { reqDeleteCourse } = useMutateCourse()
  const { data: profilesResult } = useFetchProfiles()
  const handleFileChange = (field: keyof FileState, event: any) => {
    const file = event.target.files ? event.target.files[0] : null
    setFiles((prev) => ({ ...prev, [field]: file }))
  }
  const { handleSubmit, control, formState, setValue, watch, ...others } = useForm<IForm>({
    defaultValues: {
      title: course?.title || '',
      certificateValidity: '0',
      benefits: '',
      isPublished: false,
      haveCertificate: 'true',
      certificatePreview: '',
      profiles: [],
    },
  })
  const profiles = watch('profiles')

  const profileOptions = useMemo(
    () => profilesResult?.map((r) => ({ label: r.name, value: r.id })),
    [profilesResult],
  )

  useEffect(() => {
    if (course?.title) {
      setValue('title', course.title)
    }
    if (course?.isPublished) {
      setValue('isPublished', true)
    } else {
      setValue('isPublished', false)
    }
    if (course?.profiles instanceof Array && course.profiles.length > 0) {
      setValue(
        'profiles',
        course.profiles?.map((profile) => profile.id),
      )
    }
    if (course?.certificateValidity) {
      setValue('certificateValidity', course.certificateValidity)
    }
  }, [course, setValue])

  const onSubmit = (data: any) => {
    const formData = new FormData()
    for (const key in data) {
      formData.append(key, data[key])
    }
    if (files.csvCourse) {
      formData.append('csvCourse', files.csvCourse)
    }
    if (files.csvQuestions) {
      formData.append('csvQuestions', files.csvQuestions)
    }
    if (files.image) {
      formData.append('image', files.image)
    }
    const dataObject: Record<string, any> = {}
    formData.forEach((value, key) => {
      dataObject[key] = value
    })
    dataObject.isPublished = JSON.parse(dataObject.isPublished)
    dataObject.profiles = profiles
    onUpdate(dataObject)
  }

  const handleFileDownload = () => {
    downloadFile(courseCSVLink, 'course-model.csv')
    setTimeout(() => {
      downloadFile(questionsCSVLink, 'questions-model.csv')
    }, 800)
  }

  const handleDelete = () => {
    handleModal(
      <ConfirmationModal
        text='Tem certeza que deseja deletar este curso?'
        onConfirm={() => {
          reqDeleteCourse(Number(course?.id))
          Router.push(NEW_ROUTES.AUTHENTICATED.COURSE.path)
        }}
      />,
    )
  }

  const handleLostData = (onConfirm: () => void) => {
    handleModal(
      <ConfirmationModal
        text='Você não salvou as alterações, tem certeza que deseja sair? As alterações serão perdidas'
        onConfirm={onConfirm}
      />,
    )
  }

  const { haveCertificate, benefits, isPublished } = watch()

  useEffect(() => {
    setValue(
      'certificatePreview',
      `Certificamos que [nome do usuário] inscrito(a) no CPF número [cpf do usuário], concluiu com êxito o [nome do curso] - no período de [período de formação], com carga horária de [carga horaria do curso] horas e e com validade de [data de validade do certificado], estando capacitado(a) ${benefits}`,
    )
  }, [benefits, setValue])

  return (
    <Box padding={1}>
      <Box mb={4}>
        <Typography mb={1}>
          Para cadastrar um novo curso, utilize o arquivo abaixo como modelo para anexar o curso com
          seus módulos, aulas e provas.
        </Typography>
        <ExampleFileContainer onClick={handleFileDownload}>
          <FileDownloadOutlinedIcon />
          Baixe os modelos de arquivos .csv
        </ExampleFileContainer>
      </Box>
      <Box>
        <CForm
          form={{ handleSubmit, control, formState, setValue, watch, ...others }}
          onSubmit={onSubmit}
        >
          <GridWrapper container spacing={3} sx={{ marginTop: '8px', marginBottom: '16px' }}>
            <GridItem item xs={12} md={6}>
              <StyledCInput
                fullWidth
                name='title'
                placeholder='Nome do curso'
                label='Nome do curso'
                size='small'
              />
            </GridItem>
            <GridItem item xs={12} md={6}>
              <CFileInput
                accept='.csv'
                variant='outlined'
                onChange={(event) => handleFileChange('csvCourse', event)}
                label={files?.csvCourse?.name || 'Envie o arquivo csv do curso'}
              />
            </GridItem>
            <GridItem item xs={12} md={6}>
              <CFileInput
                accept='.csv'
                variant='outlined'
                onChange={(event) => handleFileChange('csvQuestions', event)}
                label={files?.csvQuestions?.name || 'Envie o arquivo csv de questões'}
              />
            </GridItem>
            <GridItem item xs={12} md={6}>
              <CFileInput
                accept='image/*'
                variant='outlined'
                onChange={(event) => handleFileChange('image', event)}
                label={files?.image?.name || 'Imagem da Capa'}
              />
            </GridItem>
            <GridItem item xs={12} md={6}>
              <Controller
                name='isPublished'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Box>
                    <CSwitch checked={value} onChange={(e) => onChange(e.target.checked)} />
                    Publicar curso ao catálogo
                  </Box>
                )}
              />
            </GridItem>
            {isPublished && (
              <GridItem item xs={12}>
                <CSelectControlled
                  name='profiles'
                  placeholder='Selecione os perfis'
                  options={profileOptions || []}
                  multiple
                  renderValue={(selected: any) => {
                    const filteredValues = profileOptions?.filter(({ value: optValue }) =>
                      selected.includes(optValue),
                    )
                    return (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {filteredValues?.map(({ label }) => (
                          <CChip size='small' label={label} variant='outlined' key={label} />
                        ))}
                      </Box>
                    )
                  }}
                />
              </GridItem>
            )}
            <GridItem item xs={12}>
              Será disponibilizado certificado?
              <Box>
                <CRadioButtonGroupControlled
                  name='haveCertificate'
                  options={[
                    { value: 'true', label: 'Sim' },
                    { value: 'false', label: 'Não' },
                  ]}
                />
              </Box>
            </GridItem>
            {haveCertificate === 'true' && (
              <GridItem item xs={12} md={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <StyledSelect
                    name='certificateValidity'
                    placeholder='Data de validade do certificado'
                    label='Data de validade do certificado'
                    options={[
                      { value: '6', label: '6 meses' },
                      { value: '12', label: '1 ano' },
                      { value: '24', label: '2 anos' },
                      { value: '36', label: '3 anos' },
                    ]}
                  />
                </Box>
              </GridItem>
            )}
            {haveCertificatePreview && haveCertificate === 'true' && (
              <>
                <GridItem item xs={12}>
                  <StyledCInput
                    fullWidth
                    name='benefits'
                    placeholder='Descrição Certificado'
                    label='Descrição Certificado'
                    multiline
                    rows={4}
                  />
                </GridItem>
                <GridItem item xs={12} style={{ color: 'var(--mui-palette-grey-700)' }}>
                  Pré-visualização do certificado:
                  <StyledCInput
                    label='Pré-visualização do certificado'
                    placeholder='Pré-visualização do certificado'
                    fullWidth
                    name='certificatePreview'
                    rows={4}
                    disabled
                    sx={{
                      backgroundColor: 'var(--mui-palette-grey-100)',
                      border: 'var(--mui-palette-grey-100)',
                    }}
                  />
                </GridItem>
              </>
            )}
          </GridWrapper>
          <CDivider />
          <StyledFooterActions>
            <StyledDeleteWrapper onClick={handleDelete}>
              <DeleteOutlineOutlinedIcon />
              Excluir curso
            </StyledDeleteWrapper>
            <StyledOnlyDesktop>
              <StyledWrapperButtons>
                <Button variant='outlined' onClick={() => handleLostData(Router.back)}>
                  Cancelar
                </Button>
                <Button
                  variant='contained'
                  type='submit'
                  onClick={() => {
                    if (haveCertificatePreview) {
                      showSnackBar({
                        type: 'success',
                        message:
                          'Informações salvas com sucesso, vá para aba de detalhes para concluir o cadastro.',
                      })
                      changeTabOnSave?.()
                    } else {
                      showSnackBar({
                        type: 'success',
                        message: 'Alterações salvas com sucesso',
                      })
                    }
                  }}
                >
                  Salvar
                </Button>
              </StyledWrapperButtons>
            </StyledOnlyDesktop>
          </StyledFooterActions>
        </CForm>
      </Box>
    </Box>
  )
}
