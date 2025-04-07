import { Box, Button, Typography } from '@mui/material'
import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'

import { CBaseContainer, PageHeader } from '@/v3/presentation/newComponents'

import ForumSoonSvg from '/public/assets/svg/ForumSoon.svg'

import { useLayout } from '@/hooks/useLayout'

export const ForumSoonPage = () => {
  const posthog = usePostHog()
  const { showSnackBar } = useLayout()

  const onClick = () => {
    posthog.capture('clicked_forum_page')
    showSnackBar({
      message: 'Em breve, você poderá participar do fórum da Coala Saúde!',
      type: 'success',
    })
  }

  useEffect(() => {
    posthog.capture('viewed_forum_page')
  }, [posthog])

  return (
    <>
      <PageHeader title='Fórum' />
      <CBaseContainer>
        <Box
          display='flex'
          flexDirection={['column', 'row-reverse']}
          alignItems='center'
          justifyContent='center'
          gap={[0, 3]}
          mt={[4, 6]}
        >
          <Box
            height={['250px', '100%']}
            display='flex'
            alignItems='center'
            flex='1'
            maxWidth={['none', '380px']}
          >
            <ForumSoonSvg width='100%' height='100%' />
          </Box>
          <Box flex='1' maxWidth={['none', '380px']}>
            <Box display='flex' gap={1} flexDirection='column' mt={3}>
              <Typography variant='h1' color='var(--mui-palette-primary-main)'>
                Coala fórum: conecte-se, compartilhe, solucione!
              </Typography>
              <Typography variant='body1' color='var(--mui-palette-primary-main)'>
                Em breve, a Coala Saúde lançará um fórum exclusivo para você! Um espaço para
                compartilhar desafios, trocar ideias e encontrar soluções colaborativas para
                problemas comuns.
              </Typography>
              <Typography
                variant='body1'
                color='var(--mui-palette-primary-main)'
                sx={{
                  span: {
                    fontWeight: 'bold',
                  },
                }}
              >
                <span>• Comunidade :</span> Conecte-se com outros usuários que enfrentam situações
                semelhantes.
              </Typography>
              <Typography
                variant='body1'
                color='var(--mui-palette-primary-main)'
                sx={{
                  span: {
                    fontWeight: 'bold',
                  },
                }}
              >
                <span>• Colaboração :</span> Compartilhe suas experiências e aprenda com as soluções
                de outros.
              </Typography>
              <Typography
                variant='body1'
                color='var(--mui-palette-primary-main)'
                sx={{
                  span: {
                    fontWeight: 'bold',
                  },
                }}
              >
                <span>• Suporte :</span> Encontre respostas e apoio para superar obstáculos.
              </Typography>

              <Typography variant='body1' color='var(--mui-palette-primary-main)' fontWeight={700}>
                Quer participar?
              </Typography>
              <Button
                sx={{
                  backgroundColor: 'var(--mui-palette-secondary-main)',
                  marginTop: 2,
                  marginBottom: 6,
                  '&:hover': { backgroundColor: 'var(--mui-palette-secondary-main)' },
                }}
                onClick={onClick}
              >
                Sim, quero participar!
              </Button>
            </Box>
          </Box>
        </Box>
      </CBaseContainer>
    </>
  )
}

export default ForumSoonPage
