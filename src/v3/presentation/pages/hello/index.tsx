import { useState } from 'react'
import { Box, Typography, Dialog, DialogContent, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

import ReportSvg from 'public/assets/svg/validacao-de-laudos.svg'
import MentalHealthSvg from 'public/assets/svg/saude-mental-na-pratica.svg'
import PEISvg from 'public/assets/svg/PEI-do-diagnostico-a-acao.svg'
import TrainingSvg from 'public/assets/svg/capacitacao-que-transforma.svg'
import CallSvg from 'public/assets/svg/abrir-chamado.svg'
import { useBreakpoint } from '@/hooks/useBreakpoints'

import { HomeHeader } from './components/HomeHeader/HomeHeader'


const featuresData = [
  {
    id: 1,
    title: ' Saúde Mental na prática',
    description: 'Veja o depoimento real de uma escola parceira sobre como a Coala tem impactado positivamente a saúde mental no ambiente escolar, mostrando como o nosso atendimento psicológico remoto tem feito diferença no dia a dia de alunos e educadores.',
    videoUrl: '/assets/videoplayback.mp4',
    SvgComponent: MentalHealthSvg,
  },
  {
    id: 2,
    title: 'PEI: Do diagnóstico à ação',
    description: 'Apresentamos o preenchimento e a evolução do Plano Educacional Individualizado (PEI) dentro do nosso app, demonstrando como tornamos a personalização do cuidado simples, eficiente e acessível para toda a equipe pedagógica.',
    videoUrl: '/assets/videoplayback.mp4',
    SvgComponent: PEISvg, 
  },
  {
    id: 3,
    title: 'Abrir chamado',
    description: 'Acompanhe uma abertura de atendimento com nosso Time de Cuidado. Em poucos cliques, a escola aciona ajuda profissional via Coala e conta com uma equipe de saúde especializada para atender seus alunos durante todo o horário escolar.',
    videoUrl: '/assets/videoplayback.mp4',
    SvgComponent: CallSvg,
  },
    {
    id: 4,
    title: 'Validação de laudos',
    description: 'Veja como funciona o processo de validação de laudos com um especialista da nossa equipe através de uma tecnologia que garante precisão e respaldo clínico direto na escola, de forma online e rápida.',
    videoUrl: '/assets/videoplayback.mp4',
    SvgComponent: ReportSvg,
  },
    {
    id: 5,
    title: 'Capacitação que transforma',
    description: 'Conheça nosso pacote completo de apoio às escolas, com capacitações, treinamentos e conteúdos sobre saúde e bem-estar. Do diagnóstico inicial ao combate ao bullying, preparamos as equipes para enfrentar todos os desafios do ambiente escolar.',
    videoUrl: '/assets/videoplayback.mp4',
    SvgComponent: TrainingSvg,
  },
]

export default function Home() {
  const isMobile = useBreakpoint('sm')
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState('')

  const handleOpenVideoDialog = (videoUrl: any) => {
    setCurrentVideoUrl(videoUrl)
    setIsVideoDialogOpen(true)
  }

  const handleCloseVideoDialog = () => {
    setIsVideoDialogOpen(false)
    setCurrentVideoUrl('') 
  }

  return (
    <>
      <Box
        py={['32px', '32px']}
        px={['40px', '40px']}
        pb='66px'
        display='flex'
        flexDirection={['column']}
        gap={2}
      >
        <HomeHeader isMobile={isMobile} />
        <Box>
          {featuresData.map((feature) => (
            <Box
              key={feature.id}
              p={'12px'}
              display='flex'
              flexDirection={'row'}
              gap={2}
              mb={4}
              border={'4px solid var(--mui-palette-grey-200)'}
              borderRadius={'20px'}
              onClick={() => handleOpenVideoDialog(feature.videoUrl)} 
              sx={{
                cursor: 'pointer', 
                transition: 'background-color 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: 'var(--mui-palette-action-hover)', 
                }
              }}
            >
              <Box flex='1' margin={'auto'} display={'flex'} justifyContent={'center'}> 
                <feature.SvgComponent />
              </Box>
              <Box flex='1' mt={2} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                <Box>
                  <Typography sx={{fontSize: '22px !important', fontWeight: '700', color: '#6F46BE'}}>
                    {feature.title} 
                  </Typography>
                  <Typography mt={1} sx={{fontWeight: 400, fontSize: '16px'}}>
                    {feature.description}
                  </Typography>
                </Box>
                 <Box display={'flex'} mb={1} justifyContent={'flex-end'} paddingRight={2} alignItems={'center'} sx={{'svg': {color: '#64748B'}}}>
                  <Typography  sx={{fontWeight: 500, fontSize: '16px', color: '#64748B'}}>
                    Saiba Mais
                  </Typography>
                  <KeyboardArrowRightIcon />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Dialog
        open={isVideoDialogOpen}
        onClose={handleCloseVideoDialog}
        maxWidth="lg" 
        fullWidth 
        aria-labelledby="video-dialog-title"
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseVideoDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            zIndex: 1 
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ padding: 0, lineHeight: 0 }}> 
          {currentVideoUrl && (
            <video
              width="100%" 
              height="auto"
              controls 
              autoPlay  
              key={currentVideoUrl}
            >
              <source src={currentVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}