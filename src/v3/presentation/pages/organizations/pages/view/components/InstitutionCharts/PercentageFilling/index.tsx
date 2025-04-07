import React from 'react'
import { useRouter } from 'next/router'

import HealthRecordIcon from '/public/assets/svg/HealthRecordIcon.svg'

import ChartsCard from '@/components/Template/AuthTemplate/Charts/ChartsCard'
import { PaperContent } from '@/components/Paper'
import { useFetchHealthHistoryFilled } from '@/v3/presentation/hooks/api/@v2/dashboard/useFetchHealthHistoryFilled'

import { StyledChartsCard } from '../../styles'

import ContentPercentageFill from './components/ContentPercentageFill'

export const PercentageFillHealthHistoric = () => {
  const router = useRouter()
  const { data } = useFetchHealthHistoryFilled({ institutionId: Number(router.query.id) })

  return (
    <StyledChartsCard>
      <ChartsCard
        title='Preenchimento da ficha de saúde'
        subtitle='Proporção de usuários distintos na instituição com algum tipo de preenchimento da ficha de saúde'
        Svg={HealthRecordIcon}
        style={{ minHeight: 212, height: '100%' }}
      >
        <PaperContent>
          <ContentPercentageFill percent={data?.percent || 0} />
        </PaperContent>
      </ChartsCard>
    </StyledChartsCard>
  )
}

export default PercentageFillHealthHistoric
