import { FC } from 'react'
import { Typography } from '@mui/material'

import { StyledDisclaimerCard, StyledDisclaimerContent, StyledTitle } from './styles'

const content = {
  title: 'Programa de indicações Coala',
  paragraphs: [
    'Vai um mimo aí? Indique escolas para a Coala e ganhe vouchers de R$150,00 a cada indicação, para usar onde preferir! Indicou, ganhou: a escola não precisa contratar a Coala.',
    'E sabe o melhor? Quem indicar mais escolas válidas em 2023 vai curtir o final de ano em uma viagem com tudo pago pela Coala!',
    'O que você está esperando para indicar?',
  ],
}

const IndicationDisclaimer: FC = ({ ...props }) => {
  return (
    <StyledDisclaimerCard {...props}>
      <StyledTitle variant='h4' component='h2'>
        {content.title}
      </StyledTitle>

      <StyledDisclaimerContent>
        {content.paragraphs.map((paragraph, index) => (
          <Typography key={index} variant='body1'>
            {paragraph}
          </Typography>
        ))}
      </StyledDisclaimerContent>
    </StyledDisclaimerCard>
  )
}

export default IndicationDisclaimer
