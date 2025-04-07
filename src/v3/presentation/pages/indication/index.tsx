import React from 'react'
import { useRouter } from 'next/router'

import { useAuth } from '@/v3/presentation/hooks/useAuth'

import { PageHeader } from '../../newComponents'

import IndicationDisclaimer from './components/IndicationDisclaimer'
import { StyledContainer } from './styles'
import IndicationPanel from './components/IndicationPanel'
import IndicationsArea from './components/IndicationsArea'
import { IndicationProvider } from './contexts/indication.provider'

export default function Indication() {
  const { push } = useRouter()
  const { isAdmin } = useAuth()

  return (
    <IndicationProvider>
      <PageHeader
        title='Área de indicações'
        actionButtonProps={
          isAdmin
            ? undefined
            : {
                children: 'Indicar',
                onClick: () => push('indication/send'),
              }
        }
      />

      <StyledContainer>
        {!isAdmin && (
          <>
            <IndicationDisclaimer />
            <IndicationPanel />
          </>
        )}

        <IndicationsArea />
      </StyledContainer>
    </IndicationProvider>
  )
}
