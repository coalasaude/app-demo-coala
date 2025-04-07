import ReactDOM from 'react-dom'
import { ReactNode, useMemo } from 'react'

import { useBreakpoint } from '@/hooks/useBreakpoints'

import { StyledModal, StyledQuietModal } from '../styles'
import { useModalContext } from '../context/ModalProvider'

export const Modal: React.FC = () => {
  const { modal, isQuiet, handleModal } = useModalContext()
  const isMobile = useBreakpoint('sm')

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleModal()
    }
  }

  const currentModal = useMemo(() => modal[modal.length - 1], [modal])

  if (isQuiet) {
    if (isMobile) {
      const navBar = document.getElementById('c-nav-bar')
      if (navBar) navBar.classList.add('with-modal')

      const container = document.getElementById('container')
      if (container) container.classList.add('with-actions')
      const element = document.getElementById('navbar-actions')

      if (element) {
        return ReactDOM.createPortal(
          <StyledQuietModal isMobile={isMobile}>{currentModal}</StyledQuietModal>,
          element,
        ) as React.ReactElement
      }
    }

    return ReactDOM.createPortal(
      <StyledQuietModal>{currentModal}</StyledQuietModal>,
      document.querySelector('body') as HTMLElement,
    ) as ReactNode
  }

  if (modal.length) {
    return ReactDOM.createPortal(
      <StyledModal onClick={handleOutsideClick as any}>{currentModal}</StyledModal>,
      document.querySelector('body') as HTMLElement,
    ) as ReactNode
  }

  return null
}
