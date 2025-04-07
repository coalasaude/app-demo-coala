import CloseIcon from '@mui/icons-material/Close'
import { Box, BoxProps } from '@mui/material'

import BgGrid from '/public/assets/images/HelloPage/MentalHealth/MentalHealthBannerGrid.png'
import BgGridModal from '/public/assets/images/HelloPage/MentalHealth/MentalHealthBannerGridModal.png'

import { useModalContext } from '@/v3/presentation/components/Modal'

type ContainerBackgroundGridProps = React.PropsWithChildren<
  {
    backgroundColor?: string
    isModal?: boolean
    bgImage?: string
    modalBgImage?: string
    onClick?: () => void
    onClose?: () => void
  } & BoxProps['sx']
>

export const ContainerBackgroundGrid: React.FC<ContainerBackgroundGridProps> = ({
  children,
  isModal,
  bgImage = BgGrid.src,
  modalBgImage = BgGridModal.src,
  backgroundColor = 'var(--mui-palette-primary-main)',
  onClick,
  onClose,
  ...props
}) => {
  const { handleModal } = useModalContext()

  return (
    <Box
      overflow={'hidden'}
      display='flex'
      flexDirection={'column'}
      pt={isModal ? '8px' : [1, 2, 2]}
      px={isModal ? '14px' : [2, 2, 2]}
      height={isModal ? [] : [176, '210px', '210px']}
      pb={isModal ? '12px' : [1, 1, 2.5]}
      width={isModal ? ['100vw', '260px'] : undefined}
      sx={{
        backgroundColor,
        borderRadius: isModal ? '20px' : '8px',
        borderBottomLeftRadius: isModal ? [0, '20px'] : '8px',
        borderBottomRightRadius: isModal ? [0, '20px'] : '8px',
        backgroundImage: `url(${isModal ? modalBgImage : bgImage})`,
        cursor: onClick ? 'pointer' : undefined,
        ...props,
      }}
      onClick={onClick}
    >
      {isModal && (
        <Box
          display='flex'
          justifyContent='flex-end'
          mb={1}
          onClick={(e) => {
            e.stopPropagation()
            handleModal()
            onClose?.()
          }}
          sx={{ cursor: 'pointer', zIndex: 9999 }}
        >
          <CloseIcon
            sx={{
              color: backgroundColor ? 'var(--mui-palette-primary-main)' : 'white',
              fontSize: 22,
            }}
          />
        </Box>
      )}
      {children}
    </Box>
  )
}
