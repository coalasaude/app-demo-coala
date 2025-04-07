import React from 'react'
import { useRouter } from 'next/router'
import { Box } from '@mui/material'

import AreaChart from '@/components/Charts/AreaChart'
import ChartsCard from '@/components/Template/AuthTemplate/Charts/ChartsCard'
import { useFetchAppointmentPerHour } from '@/v3/presentation/hooks/api/@v2/dashboard/useFetchAppointmentPerHour'
import { NotFound } from '@/v3/presentation/components/NotFound'

import { StyledChartsCard } from '../../styles'

export const AverageTime = () => {
  const router = useRouter()
  const { data } = useFetchAppointmentPerHour({
    institutionId: Number(router.query.id),
  })

  return (
    <StyledChartsCard>
      <ChartsCard title='Horários de maior fluxo de solicitações'>
        {Boolean(data?.label.length > 0) ? (
          <Box mb={-2}>
            <AreaChart
              title='Solicitação de atendimentos'
              data={[{ label: 'Solicitações realizadas', value: data.value }]}
              categories={data.label}
            />
          </Box>
        ) : (
          <Box mt={5}>
            <NotFound text='Não encontramos nenhum atendimento para esta instituição' />
          </Box>
        )}
      </ChartsCard>
    </StyledChartsCard>
  )
}

export default AverageTime
