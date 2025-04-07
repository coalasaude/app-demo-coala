import { Box, Typography } from '@mui/material'
import Image from 'next/image'

import { WebViewManager } from '@/services/WebView'
import Paper from '@/v3/presentation/components/Paper'
import { CTooltipText } from '@/v3/presentation/newComponents/molecules/CTooltipText'

interface BannerCardProps {
  link: string
  title: string
  image: string
  author: string
  authorImage: string
  category: string
}

export const BannerCard = ({
  author,
  category,
  authorImage,
  link,
  image,
  title,
}: BannerCardProps) => {
  return (
    <Paper
      onClick={() => WebViewManager.open(link, '_blank')}
      sx={{
        minWidth: [324, 365],
        cursor: 'pointer',
        backgroundSize: 'cover',
        borderRadius: 2,
        overflow: 'hidden',
        p: '20px',
        display: 'flex',
        height: '100%',
      }}
    >
      <Box
        sx={{
          backgroundSize: 'cover',
          borderRadius: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          mr: 2,
        }}
      >
        <Box
          sx={{ backgroundColor: 'var(--mui-palette-primary-light)' }}
          borderRadius={100}
          fontSize={10}
          color='var(--mui-palette-primary-main)'
          height={16}
          width='fit-content'
          px='20px'
          display='flex'
          alignItems='center'
          justifyContent='center'
          mb={1}
        >
          {category}
        </Box>
        <CTooltipText>
          <Typography
            whiteSpace='initial'
            overflow='hidden'
            textOverflow='ellipsis'
            display='-webkit-box'
            sx={{ WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
            variant='h3'
            fontWeight='600'
            color='var(--mui-palette-grey-500)'
          >
            {title}
          </Typography>
        </CTooltipText>

        <Box display='flex' alignItems='center' mt={1}>
          <Image
            style={{ borderRadius: '100%' }}
            objectFit='contain'
            height={38}
            width={38}
            src={authorImage}
            alt={author}
          />
          <Box ml={2}>
            <Typography fontSize={'10px !important'} color='var(--mui-palette-grey-500)'>
              Escrito por
            </Typography>
            <Typography
              fontSize={'12px !important'}
              fontWeight={600}
              color='var(--mui-palette-grey-500)'
            >
              {author}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box width={[95, 217]} maxWidth={[95, 217]} flex={1} height={'100%'} position='relative'>
        <Image
          src={image}
          alt={title}
          fill
          layout='fill'
          style={{ objectFit: 'cover', borderRadius: '12px' }}
        />
      </Box>
    </Paper>
  )
}
