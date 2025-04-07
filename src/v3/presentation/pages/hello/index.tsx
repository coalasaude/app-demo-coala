import { useState } from 'react'
import { Box, Typography, Dialog, DialogContent, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import InitialStepSvg from 'public/assets/svg/AppointmentForm/InitialStep.svg'

import { HomeHeader } from './components/HomeHeader/HomeHeader'

import { useBreakpoint } from '@/hooks/useBreakpoints'

const featuresData = [
  {
    id: 1,
    title: 'Feature One Title',
    description: 'Description for feature one. It is a long established fact that a reader will be distracted...',
    videoUrl: '/assets/videoplayback.mp4',
    SvgComponent: InitialStepSvg,
  },
  {
    id: 2,
    title: 'Feature Two Title',
    description: 'Description for feature two. Many desktop publishing packages and web page editors now use...',
    videoUrl: '/assets/videoplayback.mp4',
    SvgComponent: InitialStepSvg, 
  },
  {
    id: 3,
    title: 'Feature Three Title',
    description: 'Description for feature three. Various versions have evolved over the years, sometimes by accident...',
    videoUrl: '/assets/videoplayback.mp4',
    SvgComponent: InitialStepSvg,
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
          <Typography variant='h2' mb={4}> 
            Conheça nossas features
          </Typography>

          {featuresData.map((feature) => (
            <Box
              key={feature.id}
              p={2}
              display='flex'
              flexDirection={isMobile ? 'column' : 'row'}
              gap={2}
              mt={4}
              border={'1px solid var(--mui-palette-grey-400)'}
              borderRadius={'20px'}
              alignItems={'center'}
              onClick={() => handleOpenVideoDialog(feature.videoUrl)} 
              sx={{
                cursor: 'pointer', 
                transition: 'background-color 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: 'var(--mui-palette-action-hover)', 
                }
              }}
            >
              <Box flex='1' sx={{ textAlign: isMobile ? 'center' : 'left', mb: isMobile ? 2 : 0 }}> 
                <feature.SvgComponent />
              </Box>
              <Box flex='1'>
                <Typography variant='h2' color={'var(--primary_500)'}>
                  {feature.title} 
                </Typography>
                <Typography variant='h4' mt={1}>
                  {feature.description}
                </Typography>
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