/* eslint-disable @typescript-eslint/no-empty-function */
import { Box } from '@mui/material'
import {
  HomeOutlined,
  MedicalInformationOutlined,
  MenuOutlined,
  AccountCircleOutlined,
} from '@mui/icons-material'
import Router from 'next/router'

import { NEW_ROUTES } from '@/constants/routes'

import CNavbarItem, { CNavbarItemAddAppointment } from '../../molecules/CNavbarItem'
import { target } from '../../atoms/CJoyride/constants'

import { StyledNavbar } from './styles'

interface CNavbarProps {
  children?: React.ReactNode
  toggleSidebar?: () => void
  isOpenedSidebar: boolean
}

export const CNavbar: React.FC<CNavbarProps> = ({ toggleSidebar, isOpenedSidebar }) => {

  return (
    <StyledNavbar id={'c-nav-bar'}>
      <div id='navbar-actions'></div>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        height='100%'
        flex={1}
        mx={1}
        minHeight='130px'
      >
        <CNavbarItem
          id='home'
          text='Início'
          Icon={HomeOutlined}
          onClick={() => Router.push(`/`)}
          isActive={Router.pathname.includes(`/`)}
        />
        <CNavbarItem
          id={target.coalaSideBarAppointment}
          text='Atendimento'
          Icon={AccountCircleOutlined}
          onClick={() => {}}
          isActive={
            Router.pathname.includes(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.path) &&
            !Router.pathname.includes(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.ADD.path)
          }
        />
          <CNavbarItemAddAppointment
            isActive={Router.pathname.includes(NEW_ROUTES.AUTHENTICATED.APPOINTMENT.ADD.path)}
          />
        <CNavbarItem
          id={target.coalaSideBarHealthUnit}
          text='Ficha'
          Icon={MedicalInformationOutlined}
          onClick={() => {}}
          isActive={
            Router.pathname.includes(NEW_ROUTES.AUTHENTICATED.USERS.ACCESS.HEALTH_HISTORIC.path) ||
            Router.pathname.includes(NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.path)
          }
        />
        <CNavbarItem
          id='menu'
          text='Menu'
          Icon={MenuOutlined}
          onClick={() => (toggleSidebar ? toggleSidebar() : null)}
          isActive={isOpenedSidebar}
        />
      </Box>
    </StyledNavbar>
  )
}
