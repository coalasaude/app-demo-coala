import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Dialog } from '@mui/material'
import { useRouter } from 'next/router'

import { spacing } from '@/utils/spacing'
import { MedicineModel } from '@/v3/domain/@v2/health-history/medicine/medicine.model'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { ViewMedicine } from '@/v3/presentation/pages/health-history/components/ViewMedicine'
import { CForm } from '@/components/Forms'
import { CDialogue } from '@/v3/presentation/components/Modal'
import useMediaQuery from '@/hooks/useMediaQuery'
import { MedicineUsageStatus } from '@/v3/domain/medicine'
import { bindPathParams } from '@/utils/bindParams'
import { NEW_ROUTES } from '@/constants/routes'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { useMutateApproveMedicine } from '@/v3/presentation/hooks/api/@v2/health-history/medicine/useMutateApproveMedicine'
import { useMutateStopUsageMedicine } from '@/v3/presentation/hooks/api/@v2/health-history/medicine/useMutateStopMedicineUsage'
import CSwitchControlled from '@/v3/presentation/newComponents/implementations/form/CSwitchControlled'

import { schema } from './schema'

export const FormViewContainer = ({ medicine }: { medicine: MedicineModel }) => {
  const router = useRouter()
  const authUser = useAuth().user
  const userId = Number(router.query.userId)
  const isMobile = useMediaQuery('sm')
  const [showModal, setShowModal] = useState(false)
  const { user: patient } = useFetchReadUser({ userId })
  const { mutateAsync: mutateStopUsageMedicine } = useMutateStopUsageMedicine()
  const { mutateAsync: mutateApproveMedicine } = useMutateApproveMedicine()
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      startDate: medicine.startDate,
      startHour: medicine.startHour ?? null,
      authorizationStatus: medicine.authorizationStatus,
      stopUsage: medicine.usageStatus === MedicineUsageStatus.STOPPED,
      initUsageStatus: !!medicine.startDate,
    },
    mode: 'onChange',
  })
  const stopUsage = form.watch('stopUsage')

  const healthHistoryRoute = `${bindPathParams(
    NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.path,
    {
      userId: userId,
    }
  )}?tab=2`

  const onSubmitAuthorizationMedicine = async () => {
    const data = form.getValues()
    if (!userId && !medicine.id) return

    if (data.stopUsage) {
      await mutateStopUsageMedicine({
        userId,
        id: medicine.id,
        usageStopped: true,
      })
    }

    const authorizationData = {
      id: medicine.id,
      userId,
      isUsingMedicine: !!data.initUsageStatus,
      startDate: !!data.initUsageStatus === false ? null : data.startDate,
      startHour: !!data.initUsageStatus === false ? null : data.startHour,
      authorizationStatus: data.authorizationStatus,
    }

    await mutateApproveMedicine(authorizationData)

    setShowModal(false)
    router.push(healthHistoryRoute)
  }

  const handleConfirm = () => {
    if (stopUsage) {
      setShowModal(true)
    } else {
      form.handleSubmit(onSubmitAuthorizationMedicine)()
    }
  }

  const isResponsible = patient?.responsible.some((responsible) => responsible.id === authUser?.id)
  const isAdmin = authUser?.isAdmin
  const isStoppedMedicine = medicine.usageStatus === MedicineUsageStatus.STOPPED

  return (
    <CForm form={form} onSubmit={onSubmitAuthorizationMedicine} id='myForm'>
      <CBaseContainer
        mt={spacing(2)}
        title='Dados do medicamento'
        buttonDisabled={!form.formState.isDirty}
        onCancel={() => router.push(healthHistoryRoute)}
        cancelLabel='Cancelar'
        buttonLabel={(isResponsible || isAdmin) && !isStoppedMedicine ? 'Salvar' : undefined}
        onConfirm={handleConfirm}
        infoTitle={
          (isResponsible || isAdmin) &&
          !isStoppedMedicine && (
            <CSwitchControlled name='stopUsage' label='Parar uso desse medicamento' size='small' />
          )
        }
        boxProps={{ mb: isMobile ? 2 : 0, flexDirection: isMobile ? 'column' : 'row' }}
      >
        <ViewMedicine medicine={medicine} isResponsibleLogged={isResponsible} />

        <Dialog open={showModal} onClose={() => setShowModal(false)}>
          <CDialogue
            title='Atenção'
            description='Deseja parar o uso desse medicamento?'
            confirmButtonLabel='Sim'
            cancelButtonLabel='Não'
            onConfirm={form.handleSubmit(onSubmitAuthorizationMedicine)}
            onClose={() => setShowModal(false)}
          />
        </Dialog>
      </CBaseContainer>
    </CForm>
  )
}
