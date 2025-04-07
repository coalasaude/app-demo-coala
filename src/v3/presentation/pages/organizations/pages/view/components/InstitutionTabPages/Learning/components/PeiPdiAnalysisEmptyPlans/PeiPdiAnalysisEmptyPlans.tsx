import { Box, Stack, Typography } from '@mui/material'

import useMediaQuery from '@/hooks/useMediaQuery'
import EmptyPeiPdiSvg from 'public/assets/svg/MentalHealth/EmptyPeiPdiSvg.svg'

const InstitutionalEmptyPlans = () => {
  const isMobile = useMediaQuery('sm')
  return (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      width='100%'
      justifyContent='center'
      alignItems='center'
      gap={isMobile ? 2 : 5}
      px={2}
      py={isMobile ? 3 : 5}
      pb={isMobile ? 2 : 5}
      border='2px solid var(--mui-palette-grey-200)'
      borderRadius={2}
    >
      <Box maxWidth={270} textAlign='left'>
        <Typography variant='h1' color={(theme) => theme.palette.primary.dark}>
          PEI e PDI,
        </Typography>
        <Typography variant='h1' color={(theme) => theme.palette.primary.dark}>
          agora mais rápido!
        </Typography>

        <Typography variant='body1' color={(theme) => theme.palette.primary.dark} mt={1}>
          Visite a aba Aprendizagem no perfil dos alunos e utilize nosso assistente de IA para criar
          PEIs e PDIs em poucos cliques.
        </Typography>
      </Box>
      <EmptyPeiPdiSvg
        style={{
          width: isMobile ? '100%' : 341,
        }}
      />
    </Stack>
  )
}

export default InstitutionalEmptyPlans
