import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import Paper from '@/v3/presentation/components/Paper'
import { useLazyFetch } from '@/hooks/useFetch'
import { TApiAppointmentDiagnoseResponse } from '@/v3/domain/diagnose'
import { PageHeader } from '@/v3/presentation/newComponents'

import ChipData from '../../../../components/ChipData/ChipData'

import GeneralData from './components/GeneralData'

export const DiagnoseView = () => {
  const [apiRequest, { data }] = useLazyFetch<TApiAppointmentDiagnoseResponse>()
  const router = useRouter()
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false)

  const getDiagnose = useCallback(async () => {
    if (!router.query.id) {
      return null
    }
    await apiRequest({
      path: 'appointments/:appointmentId/diagnose/:id',
      method: 'GET',
      pathParams: {
        appointmentId: router.query.id,
        id: router.query.diagnoseId,
      },
    })
  }, [apiRequest, router])

  useEffect(() => {
    getDiagnose()
  }, [getDiagnose])

  return (
    <>
      <PageHeader title='Atendimento' />
      <Box p={1}>
        <Paper>
          <ChipData data={data?.appointment} />
          <GeneralData
            getDiagnose={getDiagnose}
            setShowRemoveModal={setShowRemoveModal}
            showRemoveModal={showRemoveModal}
            data={data}
          />
        </Paper>
      </Box>
    </>
  )
}

export default DiagnoseView
