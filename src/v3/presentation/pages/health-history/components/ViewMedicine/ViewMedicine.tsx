import { Box, Grid, Typography } from '@mui/material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { useRouter } from 'next/router'

import { spacing } from '@/utils/spacing'
import { MedicineModel } from '@/v3/domain/@v2/health-history/medicine/medicine.model'
import { CardTextDownload } from '@/v3/presentation/components/CardText/CardTextDownload'
import { CDisplayRecord } from '@/v3/presentation/newComponents'
import CChip from '@/v3/presentation/newComponents/atoms/CChip'
import { MedicineUsageStatus } from '@/v3/domain/medicine'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { useCheckCanManipulateHealthHistory } from '@/v3/presentation/hooks/useCheckCanManipulateHealthHistory'

import { AuthorizationCard } from './components/AuthorizationCard'

export const ViewMedicine = ({
  medicine,
  isResponsibleLogged,
}: {
  medicine: MedicineModel
  isResponsibleLogged?: boolean
}) => {
  const router = useRouter()
  const loggedUser = useAuth().user
  const userId = Number(router.query.userId)
  const packagePhoto = medicine.getPackagePhoto()
  const prescriptionFile = medicine.getPrescriptionFile()
  const treatmentDays = medicine.getTreatmentsDays()
  const isFromAppointment = medicine.isFromAppointment
  const isUserCreator = medicine.userCreator?.id === loggedUser?.id
  const iconSx = { width: '16px', height: '14px' }
  const isStoppedMedicine = medicine.usageStatus === MedicineUsageStatus.STOPPED
  const authorizationStatusIcon =
    medicine?.getAuthorizationStatusText() === 'Sim' ? (
      <CheckCircleOutlineIcon sx={{ ...iconSx, fill: 'var(--mui-palette-success-main)' }} />
    ) : (
      <HighlightOffIcon sx={{ ...iconSx, fill: 'var(--mui-palette-error-main)' }} />
    )

  const { user } = useFetchReadUser({ userId: userId })
  const { canManipulate } = useCheckCanManipulateHealthHistory(user!)

  const showStartDate = medicine.startDate
  const showStartHour = typeof medicine.startHour === 'number'

  const renderAdditionalComponents = () => {
    if (medicine.isSOS && !medicine.isContinuousUsage) {
      return (
        <Grid item xs={6}>
          <CDisplayRecord withDivider label='Dias de tratamento' value={treatmentDays} />
        </Grid>
      )
    } else if (!medicine.isSOS && medicine.isContinuousUsage && showStartHour) {
      return (
        <Grid item xs={4}>
          <CDisplayRecord withDivider label='Hora de início' value={medicine.getStartHour()} />
        </Grid>
      )
    } else if (!medicine.isSOS && !medicine.isContinuousUsage) {
      return (
        <>
          <Grid item xs={4}>
            <CDisplayRecord withDivider label='Dias de tratamento' value={treatmentDays} />
          </Grid>
          {showStartDate ? (
            <Grid item xs={4}>
              <CDisplayRecord withDivider label='Data de início' value={medicine.getStartDate()} />
            </Grid>
          ) : null}
          {showStartHour ? (
            <Grid item xs={4}>
              <CDisplayRecord withDivider label='Hora de início' value={medicine.getStartHour()} />
            </Grid>
          ) : null}
          <Grid item xs={4}>
            <CDisplayRecord
              withDivider
              label='Responsável autoriza a medicação na escola?'
              value={
                <Box display='flex' alignItems='center'>
                  {authorizationStatusIcon} {`⠀${medicine.getAuthorizationStatusText()}`}
                </Box>
              }
            />
          </Grid>
        </>
      )
    }
    return null
  }

  const chipBackgroundColor = {
    [MedicineUsageStatus.VALID]: '--mui-palette-success-main',
    [MedicineUsageStatus.INVALID]: '--mui-palette-Button-inheritContainedBg',
    [MedicineUsageStatus.STOPPED]: '--mui-palette-warning-main',
  }

  const chipColor = {
    [MedicineUsageStatus.VALID]: '--mui-palette-grey-100',
    [MedicineUsageStatus.INVALID]: '--mui-palette-grey-500',
    [MedicineUsageStatus.STOPPED]: '--mui-palette-grey-600',
  }

  const chipIcons = {
    [MedicineUsageStatus.VALID]: (
      <CheckOutlinedIcon
        sx={{ color: `var(${chipColor[medicine.usageStatus]}) !important`, width: '16px' }}
      />
    ),
    [MedicineUsageStatus.INVALID]: (
      <CancelOutlinedIcon
        sx={{ color: `var(${chipColor[medicine.usageStatus]}) !important`, width: '16px' }}
      />
    ),
    [MedicineUsageStatus.STOPPED]: (
      <FlagOutlinedIcon
        sx={{ color: `var(${chipColor[medicine.usageStatus]}) !important`, width: '16px' }}
      />
    ),
  }

  const handleEdit = () => {
    router.push(
      bindPathParams(`${NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.MEDICINE.EDIT.path}`, {
        userId,
        id: medicine.id,
      })
    )
  }

  return (
    <>
      {isResponsibleLogged && !isStoppedMedicine && <AuthorizationCard medicine={medicine} />}
      <Box display='flex' alignItems='center' justifyContent='space-between' gap={2}>
        <Box display='flex' alignItems='flex-end' gap={2}>
          <Typography pt={spacing(2)} variant='h4' fontWeight='bold'>
            {medicine.name} {medicine.getConcentrationString()}
          </Typography>
          <CChip
            icon={chipIcons[medicine.usageStatus]}
            sx={{
              backgroundColor: `var(${chipBackgroundColor[medicine.usageStatus]})`,
              borderColor: `var(${chipBackgroundColor[medicine.usageStatus]})`,
              svg: { cursor: 'default' },
            }}
            typographyProps={{ color: `var(${chipColor[medicine.usageStatus]}) !important` }}
            label={medicine.getMedicineStatusLabel()}
            variant='outlined'
            size='medium'
          />
        </Box>

        {isUserCreator && canManipulate && (
          <EditOutlinedIcon
            sx={{ cursor: 'pointer', fill: 'var(--mui-palette-grey-500)' }}
            onClick={handleEdit}
          />
        )}
      </Box>
      <Grid container spacing={2} pt={spacing(2)}>
        <Grid item xs={6}>
          <CDisplayRecord withDivider label='Dosagem' value={medicine.getDosageString()} />
        </Grid>
        <Grid item xs={6}>
          <CDisplayRecord withDivider label='Periodicidade' value={medicine.getFrequency()} />
        </Grid>
        <Grid item xs={12}>
          <CDisplayRecord withDivider label='Observações' value={medicine.observation || '-'} />
        </Grid>
        <Grid item xs={2}>
          <CDisplayRecord
            withDivider
            label='Uso se necessário'
            value={medicine.isSOS ? 'Sim' : 'Não'}
          />
        </Grid>
        {medicine.isSOS && (
          <Grid item xs={6}>
            <CDisplayRecord withDivider label='Condições de uso' value={medicine.recommendation} />
          </Grid>
        )}
        <Grid item xs={4}>
          <CDisplayRecord
            withDivider
            label='Uso contínuo'
            value={medicine.isContinuousUsage ? 'Sim' : 'Não'}
          />
        </Grid>
        {renderAdditionalComponents()}
        {prescriptionFile.url && (
          <Grid item xs={12} sm={12}>
            <CardTextDownload
              withDivider
              label='Receita médica'
              url={prescriptionFile.url}
              filename={prescriptionFile?.name?.split('/').pop() || ''}
            />
          </Grid>
        )}
        {!isFromAppointment && packagePhoto.url && (
          <Grid item xs={12} sm={6}>
            <CardTextDownload
              withDivider
              label='Foto da embalagem do medicamento'
              url={packagePhoto.url}
              filename={packagePhoto.name || ''}
            />
          </Grid>
        )}
      </Grid>
    </>
  )
}
