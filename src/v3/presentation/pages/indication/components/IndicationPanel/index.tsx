import { FC, useMemo } from 'react'
import LocalActivityIcon from '@mui/icons-material/LocalActivityOutlined'
import { Button, Stack, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ModalCard, useModalContext } from '@/v3/presentation/components/Modal'
import { updateIndication } from '@/v3/infra/services/indication'
import { Indication, IndicationStatus, RedeemStatus } from '@/v3/domain/Indication'

import { useIndicationContext } from '../../contexts/indication.provider'

import {
  StyledButtonIcon,
  StyledCard,
  StyledCardButton,
  StyledCardContent,
  StyledContainer,
  StyledModalTitle,
  StyledTitleWrapper,
  StyledTypography,
} from './styles'

const RedeemModal: React.FC<{ indications: Indication[] }> = ({ indications }) => {
  const { invalidateQueries } = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: updateIndication,
    onSuccess: () => {
      invalidateQueries({ queryKey: ['indications'] })
    },
  })
  const { handleModal } = useModalContext()

  const handleRedeem = () => {
    indications?.forEach((indication) => {
      if (indication.status === IndicationStatus.VALID) {
        mutate({
          id: indication.id,
          redeem_status: RedeemStatus.REQUESTED,
        })
      }
    })
    handleModal()
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSdWW-8ZaOqjn_pSbrR3zK4P0XaI3H5rENMp7DyDsoM_nG9LYQ/viewform',
      '_blank'
    )
  }

  return (
    <ModalCard icon={<LocalActivityIcon />}>
      <Stack spacing={3}>
        <StyledModalTitle variant='inherit'>
          Chegou a hora de resgatar a sua premiação!
        </StyledModalTitle>

        <Typography variant='body2'>
          Clique no botão abaixo e escolha qual experiência você gostaria de ganhar.
        </Typography>

        <Typography variant='body2'>
          Ah, e não se esqueça de ficar de olho no seu e-mail: em até 2 dias úteis você receberá
          nosso retorno!
        </Typography>

        <Button type='button' onClick={handleRedeem}>
          Escolher minha Experiência
        </Button>
      </Stack>
    </ModalCard>
  )
}

const IndicationPanel: FC = () => {
  const { indicationCount, indications } = useIndicationContext()
  const { handleModal } = useModalContext()
  const cards = useMemo(
    () => [
      {
        title: (
          <>
            Indicações
            <br />
            válidas
          </>
        ),
        value: indicationCount?.valid,
      },
      {
        title: (
          <>
            Indicações
            <br />
            resgatadas
          </>
        ),
        value: indicationCount?.redeemed,
      },
      {
        title: (
          <>
            Vouchers
            <br />
            disponíveis
          </>
        ),
        value: indicationCount?.available,
        action: {
          label: 'Resgatar',
          onClick: () =>
            indicationCount?.available && handleModal(<RedeemModal indications={indications} />),
        },
      },
    ],
    [
      handleModal,
      indicationCount?.available,
      indicationCount?.redeemed,
      indicationCount?.valid,
      indications,
    ]
  )

  return (
    <StyledContainer>
      {cards.map((card) => (
        <StyledCard key={`${card.title}`}>
          <StyledTitleWrapper>
            <StyledTypography>{card.title}</StyledTypography>
          </StyledTitleWrapper>

          <StyledCardContent>
            <StyledTypography>{card.value}</StyledTypography>
            {card.action && (
              <StyledCardButton onClick={card.action.onClick}>
                {card.action.label}
                <StyledButtonIcon />
              </StyledCardButton>
            )}
          </StyledCardContent>
        </StyledCard>
      ))}
    </StyledContainer>
  )
}

export default IndicationPanel
