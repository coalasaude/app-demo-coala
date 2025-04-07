import { Box, Typography } from '@mui/material'

import TherapyMeditationBanner from '/public/assets/images/HelloPage/MentalHealth/TherapyMeditationBanner.svg'

import { useRouter } from 'next/router'
import { usePostHog } from 'posthog-js/react'

import { NEW_ROUTES } from '@/constants/routes'
import { useLayout } from '@/hooks/useLayout'
import { usePageTimeCounter } from '@/v3/presentation/hooks/usePageTimeCounter'

import { CardContainerBanner } from './CardContainerBanner'
import { ContainerBackgroundGrid } from './ContainerBackgroundGrid'

export const TherapyResponsibleContainerBanner = () => {
  const { showSnackBar } = useLayout()
  const router = useRouter()
  const { getCount } = usePageTimeCounter()
  const posthog = usePostHog()

  const onClick = () => {
    posthog.capture('clicked_therapy_banner_responsible_waiting_list', {
      time_spent: getCount(),
    })

    showSnackBar({
      type: 'success',
      message: 'Você foi adicionado a lista de espera.',
    })

    router.push(NEW_ROUTES.AUTHENTICATED.HELLO.path)
  }

  return (
    <ContainerBackgroundGrid mt={2} backgroundColor={'var(--mui-palette-primary-light)'}>
      <CardContainerBanner
        color='secondary'
        onActionClick={onClick}
        icon={null}
        image={({ width }) => <TherapyMeditationBanner width={width} height={'100%'} />}
        title={(props) => (
          <Box>
            <Box
              borderRadius='90px'
              width={'fit-content'}
              p={'2px 16px'}
              mb={2}
              sx={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}
            >
              <Typography
                fontSize={16}
                color='var(--mui-palette-secondary-main)'
                fontWeight={400}
                width={'fit-content'}
              >
                Você foi adicionado a nossa lista de espera!
              </Typography>
            </Box>
            <Typography
              maxWidth={['100%', '100%', 441]}
              {...props}
              fontSize={22}
              fontWeight={700}
              mb={2}
              lineHeight={['16px', '16px', '29px']}
            >
              Descubra como a Coala Saúde pode facilitar o acesso a profissionais altamente
              especializados em saúde emocional.
            </Typography>
            <Typography
              maxWidth={['100%', '100%', 441]}
              {...props}
              fontSize={14}
              sx={{ opacity: 0.9 }}
              fontWeight={400}
              lineHeight={'16.8px'}
            >
              Garantir o acesso a cuidados de saúde mental de qualidade é um desafio importante.
              Para ajudar a superar essa barreira, oferecemos um serviço de terapia acessível e
              confiável, com teleconsultas realizadas por nossa equipe especializada em saúde
              mental.
            </Typography>
            <br />
            <Typography
              maxWidth={['100%', '100%', 441]}
              {...props}
              fontWeight={400}
              sx={{ opacity: 0.9 }}
              fontSize={14}
              lineHeight={'16.8px'}
            >
              Nosso serviço apoia tanto os alunos quanto os colaboradores, além de disponibilizar
              aconselhamento parental para as famílias, proporcionando um suporte completo e
              adaptado através de um cuidado continuado e humanizado.
            </Typography>
          </Box>
        )}
      />
    </ContainerBackgroundGrid>
  )
}
