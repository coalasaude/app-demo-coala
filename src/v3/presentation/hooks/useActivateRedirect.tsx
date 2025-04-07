import { useCallback } from 'react'
import { useRouter } from 'next/router'

import { NEW_ROUTES } from '@/constants/routes'

import { ActivateRedirectModal } from '../components/ActivateRedirectModal/ActivateRedirectModal'
import { useModalContext } from '../components/Modal'

import { useAuth } from './useAuth'

export const useActivateRedirect = () => {
  const { handleModal } = useModalContext()
  const router = useRouter()
  const { logout, auth } = useAuth()

  const handleActivateAccount = () => {
    logout()
    handleModal()
  }

  const onOpenActivateModal = useCallback(() => {
    handleModal(<ActivateRedirectModal handleActivateAccount={handleActivateAccount} />, {
      handleOutsideClick: handleActivateAccount,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onPreventTemporaryAccess = useCallback(() => {
    const isAppointmentTemporaryRoutes = router.pathname.includes(
      NEW_ROUTES.AUTHENTICATED.APPOINTMENT.VIEW.path,
    )
    const isAttendanceOnly = !!auth.token?.attendanceOnly

    if (!isAppointmentTemporaryRoutes && isAttendanceOnly) {
      onOpenActivateModal()
    }
  }, [auth.token?.attendanceOnly, onOpenActivateModal, router.pathname])

  const onPreventSurveyTemporaryAccess = useCallback(() => {
    const isSurveyRoutes = router.pathname.includes(NEW_ROUTES.AUTHENTICATED.SURVEY.path)
    const isSurveyOnly = !!auth.token?.surveyOnly

    if (!isSurveyRoutes && isSurveyOnly) {
      logout()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token?.surveyOnly, router.pathname])

  return {
    onOpenActivateModal,
    onPreventTemporaryAccess,
    onPreventSurveyTemporaryAccess,
  }
}
