import Image from 'next/legacy/image'
import { Box } from '@mui/material'
import Router from 'next/router'

import { GridItem, GridWrapper } from '@/components/Grid'
import useMediaQuery from '@/hooks/useMediaQuery'
import { CCardBase, PageHeader } from '@/v3/presentation/newComponents'
import { NEW_ROUTES } from '@/constants/routes'
import { WebViewManager } from '@/services/WebView'

import { formatRouterMaterials } from '../utils/routerPushMaterials'

import { ManualsConfig } from './config'

export const Manuals = () => {
  const isSmallDevice = useMediaQuery('sm')
  return (
    <>
      <PageHeader
        title='Manuais'
        onBack={() => Router.push(NEW_ROUTES.AUTHENTICATED.MATERIALS.path)}
      />
      <GridWrapper>
        {ManualsConfig.map(({ name, image, url, urlName }) => {
          const { origin } = window.location
          const routerPath = Router.asPath.replace(origin, '')
          const linkUrl = formatRouterMaterials(urlName, routerPath)

          return (
            <GridItem xs={6} md={4} lg={3} key={name}>
              <CCardBase
                height='100%'
                isInteractive
                margin='0 !important'
                py={1}
                className='cursor-pointer'
                linkUrl={linkUrl}
                onClick={() => {
                  if (url) {
                    WebViewManager.open(url, '_blank')
                  }
                }}
              >
                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  flexDirection='column'
                  height='100%'
                >
                  <Image
                    src={image}
                    height={isSmallDevice ? 600 : 300}
                    alt={name}
                    objectFit='contain'
                  />
                  <Box
                    component='span'
                    display='block'
                    textAlign='center'
                    mt={1}
                    color='var(--mui-palette-blue-100)'
                  >
                    {name}
                  </Box>
                </Box>
              </CCardBase>
            </GridItem>
          )
        })}
      </GridWrapper>
    </>
  )
}

export default Manuals
