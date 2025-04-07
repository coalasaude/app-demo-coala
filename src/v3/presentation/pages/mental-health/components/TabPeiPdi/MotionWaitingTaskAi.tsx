import { Box, Grid, Typography } from '@mui/material'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

import Paper from '@/v3/presentation/components/Paper'

export const MotionWaitingTaskAi = () => {
  return (
    <Paper p={4}>
      <Box display='flex' justifyContent='center' alignContent='center'>
        <Grid container alignItems='center'>
          <Grid item xs={12} sm={6} md={6} lg={6} pl={[0, 4, 18, 32]}>
            <Typography variant='h1' color='var(--mui-palette-primary-main)' id='motionTitle'>
              Aguarde...
            </Typography>
            <Typography variant='h4' color='var(--mui-palette-grey-800)' id='motionDescription'>
              estamos gerando um plano 💜
            </Typography>
            <Box mt={2}>
              <Typography variant='caption'>Isso pode levar alguns segundos.</Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            display='flex'
            alignItems='center'
            justifyContent='center'
            pr={[0, 4, 18, 32]}
          >
            <DotLottieReact
              src='https://lottie.host/0c211c0a-21d7-4043-abd2-2de233524453/FRoNPGY2q8.json'
              loop
              autoplay
              style={{ width: '100%', minWidth: '600px' }}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default MotionWaitingTaskAi
