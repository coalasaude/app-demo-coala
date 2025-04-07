import { Box } from '@mui/material'

import { TitleIcon } from './TitleIcon'

type CardTitleBannerProps = {
  title: (args: { fontSize: string | string[] }) => React.ReactNode
  isModal?: boolean
}

export const CardTitleBanner: React.FC<CardTitleBannerProps> = ({ title, isModal }) => {
  const fontSize = isModal
    ? '18px !important'
    : ['16px !important', '16px !important', '16px !important', '24px !important']

  return (
    <Box
      px={3}
      py={[1, 1, undefined]}
      display='flex'
      height={isModal ? ['105px', '150px'] : '100%'}
      width='100%'
      flex={1}
      alignItems='center'
      justifyContent='center'
    >
      <Box display='flex' gap={1}>
        <TitleIcon isModal={isModal} />
        {title({ fontSize })}
      </Box>
    </Box>
  )
}
