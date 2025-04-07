import React from 'react'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import ChartsCard from '@/components/Template/AuthTemplate/Charts/ChartsCard'
import BarChart from '@/components/Charts/BarChart'
import { useFetchLastSixMonthsAppointments } from '@/v3/presentation/hooks/api/@v2/dashboard/useFetchLastSixMonthsAppointments'
import { NotFound } from '@/v3/presentation/components/NotFound'

import { StyledChartsCard } from '../../styles'

export const RequestAppointmentsCharts = () => {
  const router = useRouter()
  const { requestedValues, requestedCategories } = useFetchLastSixMonthsAppointments({
    institutionId: Number(router.query.id),
  })

  return (
    <StyledChartsCard>
      <ChartsCard title='Quantidade de atendimentos'>
        {Boolean(requestedValues?.length > 0) ? (
          <Box mt={[, , 6, 3]} height='100% !important'>
            <BarChart
              data={[{ label: 'Solicitações realizadas', value: requestedValues || [] }]}
              categories={requestedCategories || []}
            />
            <Box display='flex' justifyContent='center'>
              <Typography variant='h5' fontWeight={500}>
                Quantidade de atendimentos dos últimos 6 meses
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box mt={2} display='flex' justifyContent='center'>
            <NotFound text='Não encontramos nenhum atendimento para esta instituição' />
          </Box>
        )}
      </ChartsCard>
    </StyledChartsCard>
  )
}

export default RequestAppointmentsCharts
