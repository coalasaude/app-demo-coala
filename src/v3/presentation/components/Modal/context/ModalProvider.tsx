import React from 'react'

export interface IModalOptions {
  isQuiet?: boolean
  handleOutsideClick?: () => void
}

export interface IModalContext {
  modal: React.ReactElement[]
  isQuiet: boolean
  handleModal: (content?: React.ReactElement | null, options?: IModalOptions) => void
  options?: IModalOptions
}

const ModalContext = React.createContext<IModalContext>({
  modal: [],
  isQuiet: false,
  handleModal: () => {
    /* do nothing */
  },
})

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modalStack, setModalStack] = React.useState<React.ReactElement[]>([])
  const [isQuiet, setIsQuiet] = React.useState<boolean>(false)

  const handleModal = (
    content: React.ReactElement | React.ReactElement[] | null = null,
    options?: IModalOptions,
  ) => {
    const navBar = document.getElementById('c-nav-bar')
    if (navBar) navBar.classList.remove('with-modal')

    if (!content) {
      return setModalStack((prev) => prev.slice(0, prev.length - 1))
    }

    const contentArray = Array.isArray(content) ? content : [content]

    setIsQuiet(!!options?.isQuiet)
    setModalStack((prev) => {
      const newContent = contentArray.filter(
        (item) => !prev.some((prevItem) => prevItem.key && prevItem.key === item.key),
      )
      return [...prev, ...newContent]
    })
  }

  return (
    <ModalContext.Provider
      value={{
        modal: modalStack,
        isQuiet,
        handleModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => React.useContext(ModalContext)
