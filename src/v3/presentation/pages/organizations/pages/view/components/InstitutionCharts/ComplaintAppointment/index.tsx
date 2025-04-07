import React from 'react'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'

import ChartsCard from '@/components/Template/AuthTemplate/Charts/ChartsCard'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { useFetchRankComplaints } from '@/v3/presentation/hooks/api/@v2/dashboard/useFetchRankComplaints'

import { StyledChartsCard } from '../../styles'
import SkeletonCharts from '../Skeleton/SkeletonCharts'

import { StyledPieChart } from './styles'

export const ComplaintAppointmentsCharts = () => {
  const router = useRouter()
  const { data, isLoading } = useFetchRankComplaints({
    institutionId: Number(router.query.id),
  })

  if (isLoading) {
    return <SkeletonCharts title='Tipos de casos de saúde' />
  }

  return (
    <StyledChartsCard height='100%'>
      <ChartsCard title='Tipos de casos de saúde'>
        <Box my={2} height='100%'>
          {Boolean((data?.length || 0) > 0) ? (
            <StyledPieChart data={data} />
          ) : (
            <NotFound text='Não encontramos nenhum atendimento para esta instituição' />
          )}
        </Box>
      </ChartsCard>
    </StyledChartsCard>
  )
}

export default ComplaintAppointmentsCharts
