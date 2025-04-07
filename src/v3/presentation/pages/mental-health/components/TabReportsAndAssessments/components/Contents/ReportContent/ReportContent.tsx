import { SaveAlt } from '@mui/icons-material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'

import { useFetchReadMentalHealthReport } from '@/v3/presentation/hooks/api/@v2/mental-health/reports/report/useFetchReadMentalHealthReport'
import { CDisplayRecord } from '@/v3/presentation/newComponents'
import { downloadByProxy } from '@/v3/utils/downloadByProxy'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { useAvailableMentalHealthManage } from '@/v3/presentation/pages/users/components/hook/useAvailableMentalHealthManage'

import { SkeletonContent } from '../components/SkeletonContent/RequestContent'
import { ContentHeader } from '../components/ContentHeader/ContentHeader'
import { ModalDeleteMedicalReport } from '../../Modals/ModalInvalidateMedicalReport/ModalInvalidateMedicalReport'

export const ReportContent = ({ id, userId }: { userId: number; id: number }) => {
  const {
    permissionsMentalHealth: { canManageMedicalReport },
  } = useAvailableMentalHealthManage()
  const { medicalReport, isLoading } = useFetchReadMentalHealthReport({ userId, id })
  const { handleModal } = useModalContext()

  if (isLoading || !medicalReport) {
    return <SkeletonContent />
  }

  const onDownload = async () => {
    downloadByProxy({ url: medicalReport.document.url })
  }

  const handleDelete = () => {
    if (medicalReport)
      handleModal(<ModalDeleteMedicalReport userId={userId} id={medicalReport.id} />, {})
  }

  return (
    <Box>
      <Box display='flex' alignItems='center' justifyContent='space-between' flex={1}>
        <Typography variant='h4' pr={5}>
          {medicalReport.documentName}
        </Typography>
        <ContentHeader
          primaryButtonLabel={canManageMedicalReport ? 'Excluir' : undefined}
          secondaryButtonLabel='Baixar'
          primaryButtonIcon={
            canManageMedicalReport ? (
              <DeleteOutlineOutlinedIcon sx={{ fontSize: 18, mr: 1 }} />
            ) : undefined
          }
          secondaryButtonIcon={<SaveAlt sx={{ fontSize: 18, mr: 1 }} />}
          primaryButtonClick={canManageMedicalReport ? handleDelete : () => undefined}
          secondaryButtonClick={onDownload}
        />
      </Box>
      <Box
        mt={3}
        display={'grid'}
        rowGap={1}
        gridTemplateColumns={['1fr 1fr', '1fr 1fr 1fr 1fr']}
        sx={{
          border: '1px solid var(--mui-palette-grey-200)',
          borderRadius: 2,
          p: 2,
          pb: 2,
        }}
      >
        <CDisplayRecord label='Autor' withDivider={false} value={medicalReport.professionalName} />
        <CDisplayRecord
          label={medicalReport.medicalRegistrationType}
          withDivider={false}
          value={medicalReport.medicalRegistration}
        />
        <CDisplayRecord
          label={'Data de emissão'}
          withDivider={false}
          value={dayjs(medicalReport.emissionDate).format('DD.MM.YYYY')}
        />
        <CDisplayRecord
          label={'Nome do documento'}
          tooltipDescription={medicalReport.document.formattedName}
          noWrap={true}
          value={
            <Typography variant='body2' color='primary' mb={-0.5}>
              {medicalReport.document.formattedName}
            </Typography>
          }
        />
      </Box>
    </Box>
  )
}
