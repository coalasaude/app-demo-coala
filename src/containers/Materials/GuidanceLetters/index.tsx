import { Box, Typography } from '@mui/material'
import { LocalHospitalOutlined, HealingOutlined } from '@mui/icons-material'
import Router from 'next/router'

import { GridItem, GridWrapper } from '@/components/Grid'
import { AUTHENTICATED_ROUTES, NEW_ROUTES, ROUTES, subRoutes } from '@/constants/routes'
import { CCardBase, PageHeader } from '@/v3/presentation/newComponents'

export const GuidanceLetters = () => {
  return (
    <>
      <PageHeader
        title='Cartilhas de orientação'
        onBack={() => Router.push(NEW_ROUTES.AUTHENTICATED.MATERIALS.path)}
      />
      <Box width='100%'>
        <GridWrapper>
          <GridItem xs={12} md={3}>
            <CCardBase
              height='100%'
              isInteractive
              className='cursor-pointer'
              sx={{ margin: '0 !important' }}
              onClick={() =>
                Router.push(
                  ROUTES.MODULES.APP +
                    AUTHENTICATED_ROUTES.MATERIALS +
                    subRoutes.MATERIALS.GUIDANCE_LETTERS +
                    subRoutes.MATERIALS.CLINIC,
                )
              }
            >
              <Box display='flex' alignItems='center' flexDirection='column' height='100%' my={2}>
                <LocalHospitalOutlined sx={{ fontSize: '3.3rem' }} color='primary' />
                <Box
                  style={{ borderRadius: '40px' }}
                  bgcolor='var(--mui-palette-primary-light)'
                  px={2}
                  py={1}
                  mt={2}
                >
                  <Typography
                    color='primary'
                    variant='h4'
                    sx={{ fontSize: '1.1rem' }}
                    textAlign='center'
                  >
                    Clínica
                  </Typography>
                </Box>
              </Box>
            </CCardBase>
          </GridItem>
          <GridItem xs={12} md={3}>
            <CCardBase
              height='100%'
              isInteractive
              className='cursor-pointer'
              sx={{ margin: '0 !important' }}
              onClick={() =>
                Router.push(
                  ROUTES.MODULES.APP +
                    AUTHENTICATED_ROUTES.MATERIALS +
                    subRoutes.MATERIALS.GUIDANCE_LETTERS +
                    subRoutes.MATERIALS.MENTAL_HEALTH_LETTERS,
                )
              }
            >
              <Box display='flex' alignItems='center' flexDirection='column' height='100%' my={2}>
                <HealingOutlined sx={{ fontSize: '3.3rem' }} color='primary' />
                <Box
                  style={{ borderRadius: '40px' }}
                  bgcolor='var(--mui-palette-primary-light)'
                  px={2}
                  py={1}
                  mt={2}
                >
                  <Typography
                    color='primary'
                    variant='h4'
                    sx={{ fontSize: '1.1rem' }}
                    textAlign='center'
                  >
                    Saúde mental
                  </Typography>
                </Box>
              </Box>
            </CCardBase>
          </GridItem>
        </GridWrapper>
      </Box>
    </>
  )
}

export default GuidanceLetters
