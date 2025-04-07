import React from 'react'
import { useRouter } from 'next/router'

import { useFetchIndication } from '@/v3/presentation/hooks/useFetchIndication'
import { CardDescription } from '@/components/Card'
import { IndicationStatus, RedeemStatus } from '@/v3/domain/Indication'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { PageHeader } from '@/v3/presentation/newComponents'

import { StyledContainer } from '../../styles'

import {
  StyledActionsContainer,
  StyledButton,
  StyledInputContainer,
  StyledPaper,
  StyledTitleWrapper,
  StyledWrapper,
} from './styles'
import ConfirmationModal from './components/ConfirmationModal'

const ValidationIndicationPage = () => {
  const { query, back } = useRouter()
  const { data, updateIndication } = useFetchIndication(query.id as string)
  const { handleModal } = useModalContext()

  const handleUpdate = () => {
    if (data?.status === IndicationStatus.PENDING) {
      updateIndication({
        id: data?.id,
        status: IndicationStatus.VALID,
        redeem_status: RedeemStatus.AVAILABLE,
      })
    }

    if (data?.status === IndicationStatus.VALID) {
      updateIndication({ id: data?.id, redeem_status: RedeemStatus.RECEIVED })
    }

    back()
  }

  const invalidateIndication = () => {
    updateIndication({ id: data?.id, status: IndicationStatus.INVALID })
    back()
  }

  const handleConfirmation = (action: 'VALID' | 'INVALID') => {
    const actionMap: Record<typeof action, () => void> = {
      VALID: handleUpdate,
      INVALID: invalidateIndication,
    }

    handleModal(
      <ConfirmationModal
        variant={action}
        institutionName={data?.fantasyName}
        onConfirm={actionMap[action]}
      />
    )
  }

  const indicationFields = React.useMemo(
    () => [
      {
        title: 'Nome da escola',
        subtitle: data?.fantasyName,
      },
      {
        title: 'Nome do(a) gestor(a) escolar:',
        subtitle: data?.managerName,
      },
      {
        title: 'E-mail do(a) gestor(a) escolar:',
        subtitle: data?.managerEmail,
      },
      {
        title: 'WhatsApp do(a) gestor(a) escolar:',
        subtitle: data?.managerPhone,
      },
      {
        title: 'Cidade:',
        subtitle: `${data?.city} - ${data?.state}`,
      },
      {
        title: 'Número de alunos:',
        subtitle: data?.numberStudents,
      },
      {
        title: 'Valor médio da mensalidade:',
        subtitle: data?.monthlyPayment,
      },
    ],
    [data]
  )

  return (
    <div>
      <PageHeader title='Indique a coala' />

      <StyledContainer>
        <StyledPaper>
          <StyledTitleWrapper>Dados sobre a indicação</StyledTitleWrapper>
          <StyledWrapper>
            {indicationFields.map((field, index) => (
              <StyledInputContainer key={index}>
                <CardDescription title={field.title} subtitle={`${field.subtitle}`} />
              </StyledInputContainer>
            ))}
          </StyledWrapper>

          <StyledActionsContainer>
            <StyledButton type='button' onClick={() => handleConfirmation('VALID')}>
              {data?.status === IndicationStatus.VALID ? 'Confirmar pagamento' : 'Aprovar'}
            </StyledButton>
            {data?.status === IndicationStatus.PENDING && (
              <StyledButton variant='outlined' onClick={() => handleConfirmation('INVALID')}>
                Invalidar
              </StyledButton>
            )}
          </StyledActionsContainer>
        </StyledPaper>
      </StyledContainer>
    </div>
  )
}

export default ValidationIndicationPage
