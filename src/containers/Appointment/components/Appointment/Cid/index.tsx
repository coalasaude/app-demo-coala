import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useLazyFetch } from '@/hooks/useFetch'
import { TableSkeleton } from '@/components/Skeletons/TableSkeleton'
import { Permissions } from '@/constants/permissions'
import { useHasPermission } from '@/hooks/useHasPermission'
import { CidAppointment } from '@/types/cid'
import useMediaQuery from '@/hooks/useMediaQuery'

import { TCidAppointment } from './types/Tcid'
import CidListDesktop from './index.desktop'
import CidListMobile from './index.mobile'

export const DiagnoseList = ({ appointmentId, hasPatient }: TCidAppointment) => {
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false)
  const router = useRouter()
  const isSmallDevice = useMediaQuery('sm')
  const [apiRequest, { data }] = useLazyFetch<CidAppointment[]>()
  const [canManageAppointment] = useHasPermission([Permissions.MANAGE_APPOINTMENT])
  const [anchorEl, setAnchorEl] = useState<{
    recordId: number | null
    element: null | HTMLElement
  }>({
    element: null,
    recordId: null,
  })
  const open = Boolean(anchorEl.element)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, recordId: number) => {
    setAnchorEl({
      recordId,
      element: event.currentTarget,
    })
  }
  const handleClose = () => {
    setAnchorEl({
      recordId: null,
      element: null,
    })
  }
  const getCids = useCallback(async () => {
    if (!router.query.id) {
      return null
    }
    await apiRequest({
      path: `appointments/:id/cid`,
      method: 'GET',
      pathParams: {
        id: appointmentId || router.query.id,
      },
    })
  }, [apiRequest, appointmentId, router.query.id])

  useEffect(() => {
    getCids()
  }, [getCids])

  if (data === undefined) {
    return <TableSkeleton />
  }

  if (isSmallDevice) {
    return (
      <CidListMobile
        data={data}
        handleClose={handleClose}
        handleClick={handleClick}
        open={open}
        canManageAppointment={canManageAppointment}
        appointmentId={appointmentId}
        anchorEl={anchorEl}
        hasPatient={hasPatient}
        getCids={getCids}
        showRemoveModal={showRemoveModal}
        setShowRemoveModal={setShowRemoveModal}
      />
    )
  }

  return (
    <CidListDesktop
      data={data}
      handleClose={handleClose}
      handleClick={handleClick}
      open={open}
      canManageAppointment={canManageAppointment}
      appointmentId={appointmentId}
      hasPatient={hasPatient}
      anchorEl={anchorEl}
      getCids={getCids}
      showRemoveModal={showRemoveModal}
      setShowRemoveModal={setShowRemoveModal}
    />
  )
}

export default DiagnoseList
