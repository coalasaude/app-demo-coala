import { Box, TypographyProps } from '@mui/material'
import { ReactNode } from 'react'

import { useBreakpoint } from '@/hooks/useBreakpoints'
import { colorSchemaMap } from '@/v3/presentation/constants/banner-color-schema-map'

import { CardCoalaLogo } from './CardCoalaLogo'
import { CardTitleBanner } from './CardTitleBanner'
import { CylindricalShape } from './CylindricalShape'
import { CardImageBanner } from './CardImageBanner'
import { CardIllusionContent } from './CardIllusionContent'

type CardContainerBannerProps = {
  color: 'primary' | 'secondary'
  title: (args: TypographyProps) => React.ReactNode
  buttonText?: string
  icon?: ReactNode
  onActionClick: () => void
  image: (args: { width: number }) => React.ReactNode
}

export const CardContainerBanner: React.FC<CardContainerBannerProps> = ({
  color,
  image,
  title,
  buttonText,
  onActionClick,
  icon,
}) => {
  const isMobile = useBreakpoint('sm')

  return (
    <Box
      sx={{
        display: 'grid',
        height: [undefined, '100%'],
        position: 'relative',
        width: '100%',
        border: '1.5px solid white',
        gridTemplateColumns: [undefined, ['4fr 3fr']],
        flex: 1,
        backgroundColor: colorSchemaMap.main[color],
        borderRadius: '6px',
      }}
    >
      <Box
        display={['flex', 'grid']}
        flexDirection={'column'}
        pt={[4, 4, 0]}
        gridAutoRows={'16fr 7fr'}
        height='100%'
        width='100%'
        flex={1}
        gap={[4, 4, 0]}
      >
        <CardTitleBanner
          onActionClick={onActionClick}
          buttonText={buttonText}
          color={color}
          title={title}
          icon={icon}
        />
        <Box
          display='grid'
          gridTemplateColumns={'6fr 4fr'}
          height={'100%'}
          width='100%'
          position={'relative'}
        >
          {isMobile && <CylindricalShape top={-11} left={-11} />}
          <CardCoalaLogo color={color} />
          {!isMobile && <CardIllusionContent color={color} />}
          {isMobile && <CardImageBanner color={color} image={image} />}
        </Box>
      </Box>
      {!isMobile && <CardImageBanner color={color} image={image} />}
      {!isMobile && (
        <>
          <CylindricalShape top={-11} left={'calc(57.2% - 11px)'} vertical height={'62px'} />
          <CylindricalShape right={'5%'} bottom={-11} />
          <CylindricalShape bottom={60} left={-11} vertical />
        </>
      )}
      {isMobile && (
        <>
          <CylindricalShape top={-11} left={'50%'} />
        </>
      )}
    </Box>
  )
}
