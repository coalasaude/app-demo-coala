import { Box, Skeleton, Stack, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { get } from 'lodash'
import { useEffect } from 'react'

import { CInputControlled, CRadioButtonGroupControlled } from '@/v3/presentation/newComponents'
import { maxLength } from '@/components/Forms/normalizers/maxLengthNormalizer'
import { CFileInputControlled } from '@/v3/presentation/newComponents/implementations/form/CFileInputControlled'
import { useFetchInstitution } from '@/v3/presentation/hooks/api/organizations/institution/useFetchInsitution'
import { InstitutionConfig } from '@/constants/institutionConfig'
import { target } from '@/v3/presentation/newComponents/atoms/CJoyride/constants/target'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'

const characterLimit = 70

export const ResumeInputForm = ({ error }: { error: any }) => {
  const { watch, setValue } = useFormContext()
  const [resume, institutionId, patientId] = watch(['resume', 'institutionId', 'patientId'])
  const { data: institution, fetchStatus } = useFetchInstitution(institutionId as unknown as number)
  const {
    user: patient,
    refetch,
    isLoading,
  } = useFetchReadUser({ userId: patientId as unknown as number })

  const helpConfig = institution?.institutionSettings?.find(
    (setting) => setting.name === InstitutionConfig.HELP_NOTIFICATION,
  )
  if (fetchStatus !== 'idle') {
    setValue('enableNotification', Boolean(helpConfig?.value))
  }
  const isEmployee = patient?.hasRolesFromInstitution(institutionId) && !patient?.hasResponsible()
  if (isEmployee) {
    setValue('enableNotification', true)
  }
  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId])

  return (
    <>
      {isLoading && (
        <Box height='100%' display='grid' p={1} gap={4} width='100%'>
          <Box>
            <Skeleton variant='rectangular' height='70px  ' />
          </Box>
          <Box>
            <Skeleton variant='rectangular' height='70px' />
          </Box>
          <Box>
            <Skeleton variant='rectangular' height='70px' />
          </Box>
        </Box>
      )}
      {!isLoading && (
        <Stack spacing={4}>
          <div id={target.coalaResumeInputForm}>
            <Box mb={1}>
              <Typography variant='h4'>O que aconteceu?*</Typography>
              <Typography variant='caption'>
                Descreva abaixo o que está acontecendo, os sintomas, queixas ou dúvidas. Lembre-se
                que essa descrição ficará no registro de atendimento do paciente
              </Typography>
            </Box>
            <CInputControlled
              name='resume'
              maxLength={characterLimit}
              placeholder='Conta pra gente o motivo da queixa'
              label='Descrição da queixa'
              size='medium'
              fullWidth
              error={get(error, 'data.resume')}
              helperText={`${resume?.length || 0}/${characterLimit}`}
              transform={{
                input: [maxLength(characterLimit)],
                output: [maxLength(characterLimit)],
              }}
            />
          </div>
          <div id={target.coalaResumeInputFormSecond}>
            <Box>
              <Typography variant='h4'>Você tem alguma imagem para incluir?</Typography>
              <Typography variant='caption'>
                A imagem agiliza muito o atendimento e enriquece os dados.
              </Typography>
            </Box>
            <Box mt={1}>
              <CFileInputControlled
                placeholder='Selecione uma imagem'
                accept='.jpeg,.jpg,.png,.jpe,.bmp,.pdf'
                name='file'
                label='Selecione uma imagem'
              />
            </Box>
          </div>
          {!isEmployee && (
            <Box id={target.coalaNotifyResponsible}>
              <Typography variant='h4'>Notificar o responsável?*</Typography>
              <Typography variant='caption'>
                Você pode permitir que o responsável seja notificado dessa solicitação de
                atendimento.
              </Typography>
              <Box mt={1}>
                <CRadioButtonGroupControlled
                  name='enableNotification'
                  options={[
                    { label: 'Sim', value: true },
                    { label: 'Não', value: false },
                  ]}
                  disabled={isEmployee}
                  style={{ display: 'flex', flexDirection: 'row' }}
                />
              </Box>
            </Box>
          )}
        </Stack>
      )}
    </>
  )
}
