import { SaveAlt } from '@mui/icons-material'
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined'
import EditIcon from '@mui/icons-material/EditOutlined'
import { Box, Divider, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'

import { MentalHealthMedicalAnalysisResultBrowseModel } from '@/v3/domain/@v2/mental-health/reports/medical-analysis/medical-analysis-result-browse.model'
import ButtonIcon from '@/v3/presentation/components/ButtonIcon'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { CButton, CDisplayRecord } from '@/v3/presentation/newComponents'
import CLogo from '@/v3/presentation/newComponents/atoms/CLogo'
import { downloadByProxy } from '@/v3/utils/downloadByProxy'
import { useAvailableMentalHealthManage } from '@/v3/presentation/pages/users/components/hook/useAvailableMentalHealthManage'

import { FormEditMedicalAnalysis } from '../../Forms/FormEditMedicalAnalysis'
import { ModalInvalidateMedicalAnalysis } from '../../Modals/ModalInvalidateMedicalAnalysis/ModalInvalidateMedicalAnalysis'

export const AnalysisContentCard = ({
  medicalAnalysis,
  userId,
}: {
  userId: number
  medicalAnalysis: MentalHealthMedicalAnalysisResultBrowseModel
}) => {
  const { handleModal } = useModalContext()

  const handleEdit = () => {
    if (medicalAnalysis)
      handleModal(
        <FormEditMedicalAnalysis
          userId={userId}
          id={medicalAnalysis.id}
          analysis={medicalAnalysis.analysis}
        />,
        {},
      )
  }
  const {
    permissionsMentalHealth: { canManageMedicalAnalysis },
  } = useAvailableMentalHealthManage()

  const handleDownload = () => {
    if (medicalAnalysis?.document?.url) {
      downloadByProxy({ url: medicalAnalysis.document.url })
    }
  }

  const handleInvalidate = () => {
    if (medicalAnalysis)
      handleModal(<ModalInvalidateMedicalAnalysis userId={userId} id={medicalAnalysis.id} />, {})
  }

  const color = !medicalAnalysis.isInvalid
    ? 'var(--mui-palette-text-main)'
    : 'var(--mui-palette-grey-400)'

  return (
    <Box>
      {!medicalAnalysis.isInvalid && (
        <Stack
          alignItems='center'
          direction='row'
          justifyContent={['flex-start', 'space-between']}
          mb={[3, 2]}
        >
          <Typography variant='h4' mr={2}>
            Análise
          </Typography>
          <Stack alignItems='center' direction='row' gap={2}>
            <CButton variant='link' onClick={handleDownload}>
              <SaveAlt sx={{ fontSize: 18, mr: 1 }} />
              Baixar
            </CButton>
            {canManageMedicalAnalysis && (
              <CButton variant='secondary' onClick={handleInvalidate}>
                Invalidar
              </CButton>
            )}
          </Stack>
        </Stack>
      )}

      <Box
        sx={{ border: '1px solid var(--mui-palette-grey-200)', borderRadius: 2, p: 3, pb: 2 }}
        color={color}
      >
        {medicalAnalysis.isInvalid && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--mui-palette-grey-200)',
              borderRadius: 1,
              height: 44,
              mb: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BlockOutlinedIcon
                sx={{ fontSize: 20, color: 'var(--mui-palette-grey-500)', mr: 1 }}
              />
              <Typography variant='body1' color='var(--mui-palette-grey-500)' width='100%'>
                Análise invalidada
              </Typography>
            </Box>
          </Box>
        )}

        <Stack alignItems='center' direction='row' justifyContent='space-between' mb={1.5}>
          <Typography variant='h4' mr={2} color='inherit'>
            Resultado da análise
          </Typography>

          <Stack direction='row' alignItems='center' justifyContent='flex-end' flex={1} mb={'-2px'}>
            <Typography
              variant='body2'
              color={medicalAnalysis.isInvalid ? 'inherit' : 'var(--mui-palette-grey-500)'}
            >
              Emissão {dayjs(medicalAnalysis.emissionDate).format('DD/MM/YYYY')}{' '}
            </Typography>
            {medicalAnalysis.isEditable && canManageMedicalAnalysis && (
              <Box mb={-1} mt={-1.5} mr={-1.5} ml='auto'>
                <ButtonIcon icon={<EditIcon sx={{ fontSize: 18 }} />} onClick={handleEdit} />
              </Box>
            )}
          </Stack>
        </Stack>
        <Typography color='inherit'>{medicalAnalysis.analysis}</Typography>
        <Divider sx={{ mb: 1, mt: 2 }} />
        <Box
          alignItems='center'
          display='grid'
          gridTemplateColumns={['120px 2fr 1fr', '150px 2fr 1fr', '150px 230px 1fr']}
          mr={[0, 5]}
        >
          <CLogo variant='brand' size={24} color={medicalAnalysis.isInvalid ? color : undefined} />
          <CDisplayRecord
            labelProps={{ color: 'inherit' }}
            valueProps={{ color: 'inherit' }}
            label='Analisado por'
            withDivider={false}
            value={medicalAnalysis.analyzedBy.name}
          />
          <CDisplayRecord
            labelProps={{ color: medicalAnalysis.isInvalid ? 'inherit' : undefined }}
            valueProps={{ color: medicalAnalysis.isInvalid ? 'inherit' : undefined }}
            label={`Registro | ${medicalAnalysis.analyzedBy.registrationType}`}
            withDivider={false}
            value={medicalAnalysis.analyzedBy.registration}
          />
        </Box>
      </Box>
    </Box>
  )
}
