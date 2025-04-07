import { Box } from '@mui/material'

import { useBreakpoint } from '@/hooks/useBreakpoints'

import { colorSchemaMap } from '../../../../../v3/presentation/constants/banner-color-schema-map'

import { CardActionText } from './CardActionText'
import { CardTitleBanner } from './CardTitleBanner'
import { CylindricalShape } from './CylindricalShape'
import { CardImageBanner } from './CardImageBanner'

type CardContainerBannerProps = {
  color: 'primary' | 'secondary'
  title: (args: { fontSize: string | string[] }) => React.ReactNode
  text: string
  buttonText: string
  onActionClick: () => void
  image: (args: { width: number; height: number }) => React.ReactNode
  isModal?: boolean
}

export const CardContainerBanner: React.FC<CardContainerBannerProps> = ({
  color,
  image,
  title,
  text,
  buttonText,
  onActionClick,
  isModal,
}) => {
  const isMobile = useBreakpoint('sm')

  if (isModal) {
    return (
      <Box
        sx={{
          position: 'relative',
          width: ['100%', '100%', '230px'],
          overflow: 'hidden',
          border: '1.5px solid white',
          backgroundColor: colorSchemaMap.main[color],
          borderRadius: '6px',
        }}
      >
        <CardTitleBanner title={title} isModal={true} />
        <Box display='grid' gridTemplateColumns={'1fr 1fr'} minHeight={120}>
          <CardActionText
            text={text}
            onActionClick={onActionClick}
            buttonText={buttonText}
            color={color}
            isModal={true}
          />
          <CardImageBanner color={color} image={image} isModal />
        </Box>
        <CylindricalShape top={-7} left={'52%'} />
        <CylindricalShape top={98} left={-5} />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: ['flex', 'flex', 'flex', 'grid'],
        flexDirection: 'column',
        height: ['182px', '182px', '182px'],
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        border: '1.5px solid white',
        backgroundColor: colorSchemaMap.main[color],
        borderRadius: '6px',
      }}
    >
      <Box
        height='100%'
        width='100%'
        flex={1}
        sx={{
          display: 'grid',
          width: '100%',
          overflow: 'hidden',
          gridTemplateColumns: ['1fr', '7fr 3fr', '7fr 3fr', '10fr 3fr 1fr'],
        }}
      >
        <Box
          display='flex'
          flexDirection='column'
          height={[undefined, undefined, '100%']}
          width={[undefined, undefined, '100%']}
          alignItems='center'
          justifyContent='center'
          flex={1}
        >
          <Box
            height={'100%'}
            {...(isMobile && {
              display: 'grid',
              width: '100%',
              gridTemplateColumns: 'minmax(274px, 6fr) 3fr',
            })}
          >
            <CardTitleBanner title={title} />
            {isMobile && (
              <>
                <CardImageBanner color={color} image={image} />
              </>
            )}
          </Box>
          <CardActionText
            text={text}
            onActionClick={onActionClick}
            buttonText={buttonText}
            color={color}
            hideOnTablet
          />
        </Box>
        {!isMobile && (
          <>
            <Box height='100%' width='100%' flex={1}>
              <CardImageBanner color={color} image={image} />
            </Box>
            <Box
              display={['none', 'none', 'none', 'flex']}
              height='100%'
              width='100%'
              sx={{ backgroundColor: 'white' }}
            >
              <Box
                display='flex'
                height='100%'
                width='100%'
                flex={1}
                sx={{
                  backgroundImage: `url('${colorSchemaMap.ilussion[color]}')`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              />
            </Box>
          </>
        )}
        {!isMobile && (
          <>
            <CylindricalShape top={-7} left={'30%'} />
            <CylindricalShape right={'42%'} bottom={-7} />
            <CylindricalShape bottom={44} left={-7} vertical />
            <CylindricalShape top={20} right={-7} vertical />
          </>
        )}
      </Box>
      <Box display={['inherit', 'inherit', 'inherit', 'none']}>
        <CardActionText
          text={text}
          onActionClick={onActionClick}
          buttonText={buttonText}
          color={color}
        />
      </Box>
    </Box>
  )
}
