import Image from 'next/legacy/image'
import { Box } from '@mui/material'
import Router from 'next/router'

import { GridItem, GridWrapper } from '@/components/Grid'
import useMediaQuery from '@/hooks/useMediaQuery'
import { CCardBase, PageHeader } from '@/v3/presentation/newComponents'
import { NEW_ROUTES } from '@/constants/routes'
import { WebViewManager } from '@/services/WebView'

import { formatRouterMaterials } from '../../utils/routerPushMaterials'

import { MentalHealthProtocolsConfig } from './config'

export const MentalHealthProtocols = () => {
  const isSmallDevice = useMediaQuery('sm')
  return (
    <>
      <PageHeader
        title='Saúde mental'
        onBack={() => Router.push(NEW_ROUTES.AUTHENTICATED.MATERIALS.PROTOCOLS.path)}
      />
      <GridWrapper>
        {MentalHealthProtocolsConfig.map(({ name, image, url, urlName }) => {
          const { origin } = window.location
          const routerPath = Router.asPath.replace(origin, '')
          const linkUrl = formatRouterMaterials(urlName, routerPath)

          return (
            <GridItem xs={6} md={4} lg={3} key={name}>
              <CCardBase
                isInteractive
                height='100%'
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
                <Image
                  src={image}
                  height={isSmallDevice ? 600 : 300}
                  width={400}
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
              </CCardBase>
            </GridItem>
          )
        })}
      </GridWrapper>
    </>
  )
}

export default MentalHealthProtocols
