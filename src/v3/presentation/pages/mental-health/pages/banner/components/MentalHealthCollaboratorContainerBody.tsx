import { Box, Typography } from '@mui/material'

import MentalHealthBannerImage from '/public/assets/images/HelloPage/MentalHealth/MentalHealthBannerFive.svg'
import MentalHealthBannerBg from '/public/assets/images/HelloPage/MentalHealth/MentalHealthPageBgCollaborator.png'
import Logo from '/public/assets/svg/LogoCoala.svg'

import useMediaQuery from '@/hooks/useMediaQuery'

export const MentalHealthCollaboratorContainerBody = () => {
  const isTablet = useMediaQuery('md')

  return (
    <Box
      overflow='hidden'
      sx={{
        backgroundImage: `url(${MentalHealthBannerBg.src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderRadius: '8px',
        border: '1px',
      }}
    >
      <Box display='flex' alignItems='center' justifyContent='center'>
        <Box display='flex' gap={1} justifyContent='center' pl={[, 8, 10, 0]}>
          <Box>
            <Box
              display='flex'
              justifyContent='center'
              sx={{
                border: '1px solid white',
                borderRadius: '90px',
                padding: '3px',
                paddingX: '5px',
                bgcolor: 'white',
                maxWidth: '330px',
              }}
            >
              <Typography
                color='var(--mui-palette-secondary-main)'
                fontWeight={400}
                lineHeight='17.6px'
                fontSize={[, '12px !important', '14px !important', '16px !important']}
              >
                Você foi adicionado a nossa lista de espera!
              </Typography>
            </Box>
            <Typography
              maxWidth={441}
              color='var(--mui-palette-primary-main)'
              fontWeight={800}
              lineHeight='24.2px'
              fontSize={[, '18px !important', '20px !important', '22px !important']}
              pt={1}
            >
              Descubra como a Coala Saúde pode facilitar o acesso a profissionais altamente
              especializados em saúde emocional.
            </Typography>
            <Typography
              maxWidth={441}
              fontWeight={400}
              lineHeight='16.8px'
              color='white'
              fontSize={[, '10px !important', '12px !important', '14px !important']}
              mt={1}
            >
              Garantir o acesso a cuidados de saúde mental de qualidade é um desafio importante.
              Para ajudar a superar essa barreira, oferecemos um serviço de terapia acessível e
              confiável, com teleconsultas realizadas por nossa equipe especializada em saúde
              mental.
            </Typography>
            <Typography
              maxWidth={441}
              fontSize={[, '10px !important', '12px !important', '14px !important']}
              fontWeight={400}
              lineHeight='16.8px'
              color='white'
              mt={1}
            >
              Nosso serviço apoia tanto os alunos quanto os colaboradores, além de disponibilizar
              aconselhamento parental para as famílias, proporcionando um suporte completo e
              adaptado através de um cuidado continuado e humanizado.
            </Typography>
            <Box pt={[, 1, 2, 4]}>
              <Logo style={{ minHeight: '32px', minWidth: '118px' }} />
            </Box>
          </Box>
        </Box>
        <Box>
          <MentalHealthBannerImage
            style={{
              minHeight: isTablet ? '350px' : '550px',
              minWidth: isTablet ? '350px' : '550px',
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
