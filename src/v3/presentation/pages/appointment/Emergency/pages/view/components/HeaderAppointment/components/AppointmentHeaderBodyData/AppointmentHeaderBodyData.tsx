import StarsIcon from '@mui/icons-material/Stars'

import { GridItem, GridWrapper } from '@/components/Grid'
import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { AppointmentReadDataModel } from '@/v3/domain/@v2/appointment/appointment-read-data.model'
import { CDisplayRecord, CTooltip } from '@/v3/presentation/newComponents'
import { WebViewManager } from '@/services/WebView'
import { InstitutionConfigEnum } from '@/constants/institutionConfig'
import { useFetchInstitution } from '@/v3/presentation/hooks/api/organizations/institution/useFetchInsitution'

interface CHeaderAppointmentProps {
  appointment: AppointmentReadDataModel
  allowMedicine?: boolean
}

export const AppointmentHeaderBodyData = ({
  appointment,
  allowMedicine,
}: CHeaderAppointmentProps) => {
  const { data } = useFetchInstitution(appointment?.institution?.id)
  const navigateToInstitutionRouter = (id?: number) =>
    WebViewManager.open(
      bindPathParams(NEW_ROUTES.AUTHENTICATED.ORGANIZATION.INSTITUTION.path, {
        id: String(id),
      }),
      '_blank',
    )

  const emergencyCallcenter = data?.getConfig(InstitutionConfigEnum.EMERGENCY_CALLCENTER)
  const emergencyCallcenterProfiles = emergencyCallcenter?.profiles?.map((profile) => profile?.name)
  const joinEmergyCallcenterProfiles = emergencyCallcenterProfiles?.join(', ')

  const mentalHealth = data?.getConfig(InstitutionConfigEnum.MENTAL_HEALTH_PRODUCT)
  const mentalHealthProfiles = mentalHealth?.profiles?.map((profile) => profile?.name)
  const joinMentalHealthProfiles = mentalHealthProfiles?.join(', ')

  const isNewInstitution = appointment?.institution?.isNew

  return (
    <GridWrapper direction='row'>
      <GridItem xs={4} sx={{ position: 'relative' }}>
        <CDisplayRecord
          label='Instituição'
          value={appointment?.institution?.fantasyName}
          tooltipDescription={appointment?.institution?.fantasyName}
          valueProps={{ variant: 'h6', fontWeight: 'bold' }}
          onClick={() => navigateToInstitutionRouter(appointment?.institution?.id)}
          withDivider={false}
          noWrap
        />
        {isNewInstitution && (
          <CTooltip description='Nova'>
            <StarsIcon
              sx={{
                color: 'var(--mui-palette-primary-main)',
                fontSize: 'inherit',
                position: 'absolute',
                left: 76,
                top: 18,
              }}
            />
          </CTooltip>
        )}
      </GridItem>

      <GridItem xs={4}>
        <CDisplayRecord
          label='Cobertura'
          value={joinEmergyCallcenterProfiles || 'Não habilitado'}
          tooltipDescription={joinEmergyCallcenterProfiles || 'Não habilitado'}
          valueProps={{ variant: 'h6', fontWeight: 'bold' }}
          onClick={() => navigateToInstitutionRouter(appointment?.institution?.id)}
          withDivider={false}
          noWrap
        />
      </GridItem>
      <GridItem xs={4}>
        <CDisplayRecord
          label='Saúde mental'
          value={joinMentalHealthProfiles || 'Não habilitado'}
          tooltipDescription={joinMentalHealthProfiles || 'Não habilitado'}
          valueProps={{ variant: 'h6', fontWeight: 'bold' }}
          onClick={() => navigateToInstitutionRouter(appointment?.institution?.id)}
          withDivider={false}
          noWrap
        />
      </GridItem>
      {allowMedicine && (
        <GridItem xs={4}>
          <CDisplayRecord
            label='Permite medicação'
            value={'-'}
            valueProps={{ variant: 'h6', fontWeight: 'bold' }}
            withDivider={false}
          />
        </GridItem>
      )}
    </GridWrapper>
  )
}
