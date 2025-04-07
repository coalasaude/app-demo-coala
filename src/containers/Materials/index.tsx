import { Box, Typography } from '@mui/material'
import {
  AccountTreeOutlined,
  ArticleOutlined,
  DescriptionOutlined,
  MenuBookOutlined,
  PsychologyOutlined,
  RestaurantOutlined,
} from '@mui/icons-material'
import Router from 'next/router'

import { GridItem, GridWrapper } from '@/components/Grid'
import { NEW_ROUTES } from '@/constants/routes'
import { CCardBase, PageHeader } from '@/v3/presentation/newComponents'

export const Materials = () => {
  return (
    <>
      <PageHeader
        title='Materiais'
        onBack={() => Router.push(`${NEW_ROUTES.AUTHENTICATED.HELLO.path}`)}
      />
      <Box mx='auto' width='100%'>
        <GridWrapper>
          <GridItem xs={12} md={3}>
            <CCardBase
              isInteractive
              height='100%'
              className='cursor-pointer'
              sx={{ margin: '0 !important' }}
              onClick={() => Router.push(NEW_ROUTES.AUTHENTICATED.MATERIALS.GUIDANCE_LETTERS.path)}
            >
              <Box display='flex' alignItems='center' flexDirection='column' height='100%' my={2}>
                <ArticleOutlined sx={{ fontSize: '3.3rem' }} color='primary' />
                <Box
                  style={{ borderRadius: '40px' }}
                  bgcolor='var(--mui-palette-primary-light)'
                  px={1}
                  py={1}
                  mt={2}
                >
                  <Typography color='primary' variant='h4' textAlign='center'>
                    Cartilhas de orientação
                  </Typography>
                </Box>
              </Box>
            </CCardBase>
          </GridItem>
          <GridItem xs={12} md={3}>
            <CCardBase
              isInteractive
              height='100%'
              className='cursor-pointer'
              sx={{ margin: '0 !important' }}
              onClick={() => Router.push(NEW_ROUTES.AUTHENTICATED.MATERIALS.EBOOKS.path)}
            >
              <Box display='flex' alignItems='center' flexDirection='column' height='100%' my={2}>
                <MenuBookOutlined sx={{ fontSize: '3.3rem' }} color='primary' />
                <Box
                  style={{ borderRadius: '40px' }}
                  bgcolor='var(--mui-palette-primary-light)'
                  px={2}
                  py={1}
                  mt={2}
                >
                  <Typography textAlign='center' color='primary' variant='h4'>
                    E-books
                  </Typography>
                </Box>
              </Box>
            </CCardBase>
          </GridItem>
          <GridItem xs={12} md={3}>
            <CCardBase
              isInteractive
              height='100%'
              className='cursor-pointer'
              sx={{ margin: '0 !important' }}
              onClick={() => Router.push(NEW_ROUTES.AUTHENTICATED.MATERIALS.MANUALS.path)}
            >
              <Box display='flex' alignItems='center' flexDirection='column' height='100%' my={2}>
                <DescriptionOutlined sx={{ fontSize: '3.3rem' }} color='primary' />
                <Box
                  style={{ borderRadius: '40px' }}
                  bgcolor='var(--mui-palette-primary-light)'
                  px={2}
                  py={1}
                  mt={2}
                >
                  <Typography textAlign='center' color='primary' variant='h4'>
                    Manuais
                  </Typography>
                </Box>
              </Box>
            </CCardBase>
          </GridItem>
          <GridItem xs={12} md={3}>
            <CCardBase
              isInteractive
              height='100%'
              className='cursor-pointer'
              sx={{ margin: '0 !important' }}
              onClick={() => Router.push(NEW_ROUTES.AUTHENTICATED.MATERIALS.PROTOCOLS.path)}
            >
              <Box display='flex' alignItems='center' flexDirection='column' height='100%' my={2}>
                <AccountTreeOutlined sx={{ fontSize: '3.3rem' }} color='primary' />
                <Box
                  style={{ borderRadius: '40px' }}
                  bgcolor='var(--mui-palette-primary-light)'
                  px={2}
                  py={1}
                  mt={2}
                >
                  <Typography textAlign='center' color='primary' variant='h4'>
                    Protocolos
                  </Typography>
                </Box>
              </Box>
            </CCardBase>
          </GridItem>
          <GridItem xs={12} md={3}>
            <CCardBase
              isInteractive
              height='100%'
              className='cursor-pointer'
              sx={{ margin: '0 !important' }}
              onClick={() => Router.push(NEW_ROUTES.AUTHENTICATED.MATERIALS.SCHOOL_NUTRITION.path)}
            >
              <Box display='flex' alignItems='center' flexDirection='column' height='100%' my={2}>
                <RestaurantOutlined sx={{ fontSize: '3.3rem' }} color='primary' />
                <Box
                  style={{ borderRadius: '40px' }}
                  bgcolor='var(--mui-palette-primary-light)'
                  px={2}
                  py={1}
                  mt={2}
                >
                  <Typography textAlign='center' color='primary' variant='h4'>
                    Nutrição escolar
                  </Typography>
                </Box>
              </Box>
            </CCardBase>
          </GridItem>
          <GridItem xs={12} md={3}>
            <CCardBase
              isInteractive
              height='100%'
              className='cursor-pointer'
              sx={{ margin: '0 !important' }}
              onClick={() => Router.push(NEW_ROUTES.AUTHENTICATED.MATERIALS.SCHOOL_PSYCHOLOGY.path)}
            >
              <Box display='flex' alignItems='center' flexDirection='column' height='100%' my={2}>
                <PsychologyOutlined sx={{ fontSize: '3.3rem' }} color='primary' />
                <Box
                  style={{ borderRadius: '40px' }}
                  bgcolor='var(--mui-palette-primary-light)'
                  px={2}
                  py={1}
                  mt={2}
                >
                  <Typography textAlign='center' color='primary' variant='h4'>
                    Psicologia escolar
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

export default Materials
