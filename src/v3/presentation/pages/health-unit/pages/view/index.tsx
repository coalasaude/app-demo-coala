import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import { DefaultStatus } from '@/types/status'
import { useHasPermission } from '@/hooks/useHasPermission'
import { Permissions } from '@/constants/permissions'
import { NEW_ROUTES } from '@/constants/routes'
import { useLayout } from '@/hooks/useLayout'
import { capitalizeName } from '@/utils/capitalizeName'
import { PageHeader } from '@/v3/presentation/newComponents'
import CTabs from '@/v3/presentation/components/TabsContainer'
import { useFetchReadHealthUnit } from '@/v3/presentation/hooks/api/@v2/health-units/health-unit/useFetchReadHealthUnit'
import { useMutateEditHealthUnit } from '@/v3/presentation/hooks/api/@v2/health-units/health-unit/useMutateEditHealthUnit'
import { useMutateDeleteHealthUnit } from '@/v3/presentation/hooks/api/@v2/health-units/health-unit/useMutateDeleteHealthUnit'

import { LinkedInstitutions } from './components/LinkedInstitutions'
import { Company } from './components/Company'
import { Infrastructure } from './components/Infrastructure'
import { Financial } from './components/Financial'
import { Appointment } from './components/Appointment'
import { Modal } from './components/Modal'

export function ViewHealthUnit() {
  const router = useRouter()
  const routerRef = useRef(router)
  const tabFromUrl = router.query.tab
  const { showSnackBar } = useLayout()

  const [canEdit] = useHasPermission([Permissions.MANAGE_HEALTH_UNIT])
  const { mutateAsync } = useMutateEditHealthUnit()
  const { mutateAsync: mutateDeleteHealthUnit } = useMutateDeleteHealthUnit()

  const [status, setStatus] = useState<DefaultStatus>()
  const [isOpen, setIsOpen] = useState(false)

  const { healthUnit } = useFetchReadHealthUnit({ healthUnitId: Number(router.query.id) })

  useEffect(() => {
    if (!tabFromUrl) {
      routerRef.current.push({
        pathname: routerRef.current.pathname,
        query: { ...routerRef.current.query, tab: '0' },
      })
    }
  }, [tabFromUrl])

  useEffect(() => {
    setStatus(healthUnit?.status)
  }, [healthUnit?.status])

  const handleStatusChange = (newStatus: DefaultStatus) => {
    setStatus(newStatus)

    if (newStatus === DefaultStatus.ACTIVE) {
      activeHealthUnit()
    } else {
      disableHealthUnit()
    }
  }

  const activeHealthUnit = () => {
    mutateAsync({
      healthUnitId: Number(routerRef.current.query.id),
      payload: { ...healthUnit!.toJSON(), status: DefaultStatus.ACTIVE },
    }).then(() => showSnackBar({ type: 'success', message: 'A unidade foi ativada!' }))
  }

  const disableHealthUnit = () => {
    mutateDeleteHealthUnit({ healthUnitId: Number(routerRef.current.query.id) })
      .then(() => {
        showSnackBar({ type: 'success', message: 'A unidade foi desativada!' })
        router.push(`${NEW_ROUTES.AUTHENTICATED.HEALTH_UNIT.path}`)
      })
      .catch(() => {
        showSnackBar({ type: 'error', message: 'Ocorreu um erro inesperado.' })
      })
  }

  const handleSwitchChange = () => {
    if (status === DefaultStatus.INACTIVE) {
      handleStatusChange(DefaultStatus.ACTIVE)
      return
    }

    setIsOpen(true)
  }

  const handleModalClose = () => {
    setIsOpen(false)
  }

  const handleModalConfirm = () => {
    setIsOpen(false)
    handleStatusChange(DefaultStatus.INACTIVE)
  }

  return (
    <>
      <PageHeader
        title={capitalizeName(healthUnit?.company?.name || healthUnit?.company?.companyName)}
        onBack={() => router.push(`${NEW_ROUTES.AUTHENTICATED.HEALTH_UNIT.path}`)}
        secondaryButtonProps={{
          children: status === DefaultStatus.ACTIVE ? 'Inativar' : 'Ativar',
          onClick: handleSwitchChange,
          notUsePortal: true,
        }}
      />
      <Modal open={isOpen} handleConfirm={handleModalConfirm} handleClose={handleModalClose} />
      <CTabs
        tabsNames={[
          'Dados da unidade',
          'Funcionamento',
          'Financeiro',
          'Serviços',
          'Instituições vinculadas',
        ]}
        tabsBody={[
          <Company key={0} data={healthUnit} canEdit={canEdit} />,
          <Infrastructure data={healthUnit} canEdit={canEdit} key={1} />,
          <Financial data={healthUnit} canEdit={canEdit} key={2} />,
          <Appointment data={healthUnit} canEdit={canEdit} key={3} />,
          <LinkedInstitutions data={healthUnit} canEdit={canEdit} key={4} />,
        ]}
      />
    </>
  )
}
