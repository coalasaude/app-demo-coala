import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { Box, Drawer } from '@mui/material'
import { useRouter } from 'next/router'
import { type ReactNode, useEffect, useRef } from 'react'
import SimpleBar from 'simplebar-react'
import type { TSidebarItem } from './config'
import type { AuthState } from '@/v3/infra/services/AuthStorage'

import { ROUTES } from '@/constants/routes'
import useMediaQuery from '@/hooks/useMediaQuery'

import { CDivider } from '../..'
import { target } from '../../atoms/CJoyride/constants/target'
import CSidebarItemList from '../CSidebarItemList'
import EmergencyListItem from '../EmergencyListItem'

import { CollapseButton, SideBar, SidebarContent } from './styles'

export interface CSideBarProps {
  isOpen: boolean
  toggleSidebar: () => void
  sidebarItems: TSidebarItem[]
  auth: AuthState
  topSection?: ReactNode
  showEmergencyButton?: boolean
  sidebarFooterItems?: TSidebarItem[]
  scrollToTop?: boolean
}

const CSideBar = ({
  isOpen,
  toggleSidebar,
  auth,
  sidebarItems,
  topSection,
  sidebarFooterItems,
  scrollToTop,
}: CSideBarProps) => {
  const isMediumDevice = useMediaQuery('md')
  const isSmallDevice = useMediaQuery('sm')
  const ArrowIcon = isOpen ? ArrowBackIos : ArrowForwardIos
  const router = useRouter()
  const sidebarRef = useRef<HTMLDivElement | null>(null)
  const sidebarTopRef = useRef<HTMLDivElement | null>(null)

  const handleItemClick = (item: TSidebarItem) => {
    const builtRoute = item.route({
      institutionId: auth.selectedInstitution,
      networkId: auth?.user?.roles?.find((up) => up.institution?.id === auth.selectedInstitution)
        ?.institution?.networkId,
    })
    return () =>
      router.push(
        builtRoute.startsWith(ROUTES.MODULES.APP)
          ? builtRoute
          : `${ROUTES.MODULES.APP}${builtRoute}`,
      )
  }

  useEffect(() => {
    sidebarRef?.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [scrollToTop])

  return (
    <>
      <CollapseButton isOpen={isOpen} onClick={() => toggleSidebar()}>
        <ArrowIcon sx={{ fontSize: 10 }} />
      </CollapseButton>
      <Drawer
        anchor='left'
        variant={isMediumDevice && isOpen ? 'temporary' : 'permanent'}
        open={isOpen}
        id='sidebar-drawer'
        ModalProps={{ onClose: () => toggleSidebar() }}
        PaperProps={{
          sx: (theme) => ({
            overflow: isSmallDevice ? 'auto' : 'hidden',
            borderRight: isSmallDevice ? 'unset' : `1px dashed ${theme.palette.grey[300]}`,
            background: theme.palette.background.light,
            borderRadius: '0 !important',
            zIndex: 100,
            boxShadow: 'none',
          }),
        }}
      >
        <SidebarContent
          isOpen={isOpen}
          sx={{
            position: 'relative',
            overflow: ['hidden'],
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box p={1} mt={1} ref={sidebarTopRef}>
            <Box p={1}>{topSection}</Box>
            <CDivider sx={{ my: 2, mx: 2 }} />
              <div id={target.coala}>
                <EmergencyListItem isOpen={isOpen} />
                <CDivider sx={{ mx: 2, mt: 2, mb: 1 }} />
              </div>
          </Box>
          <Box sx={{ position: 'relative', flex: 1 }}>
            <SimpleBar
              scrollableNodeProps={{ ref: sidebarRef, id: 'sidebar-content' }}
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                overflow: 'auto',
                top: 0,
              }}
            >
              <SideBar disablePadding open={isOpen}>
                <CSidebarItemList
                  handleItemClick={handleItemClick}
                  sidebarItems={sidebarItems}
                  isOpen={isOpen}
                  isSmallDevice={isSmallDevice}
                  toggleSidebar={toggleSidebar}
                  auth={auth}
                />
              </SideBar>
              {isSmallDevice && <CDivider sx={{ mx: 2, mb: 4 }} />}
              {isSmallDevice && sidebarFooterItems && sidebarFooterItems.length > 0 && (
                <SideBar disablePadding open={isOpen}>
                  <CSidebarItemList
                    title='Conta'
                    sidebarItems={sidebarFooterItems}
                    isOpen={isOpen}
                    isSmallDevice={isSmallDevice}
                    toggleSidebar={toggleSidebar}
                    auth={auth}
                  />
                </SideBar>
              )}
            </SimpleBar>
          </Box>
        </SidebarContent>
      </Drawer>
    </>
  )
}

export default CSideBar
