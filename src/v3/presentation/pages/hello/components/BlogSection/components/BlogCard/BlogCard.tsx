import { Box, Typography } from '@mui/material'
import Image from 'next/image'

import { WebViewManager } from '@/services/WebView'

interface BlogCardProps {
  link: string
  title: string
  image: string
  author: string
  authorImage: string
  authorBio: string
}

export const BlogCard = ({ author, authorBio, authorImage, link, image, title }: BlogCardProps) => {
  return (
    <Box
      onClick={() => WebViewManager.open(link, '_blank')}
      sx={{
        cursor: 'pointer',
        backgroundColor: 'var(--mui-palette-primary-main)',
        backgroundSize: 'cover',
        borderRadius: 2,
        overflow: 'hidden',
        gridTemplateColumns: '1fr 1fr',
        display: 'grid',
        height: '100%',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'var(--mui-palette-primary-main)',
          backgroundSize: 'cover',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          mr: 2,
          py: [4, 0, 0, 0],
          pl: ['30px', '40px'],
        }}
      >
        <Box
          sx={{ backgroundColor: 'var(--mui-palette-primary-dark)' }}
          borderRadius={100}
          fontSize={10}
          color='white'
          height={16}
          width={60}
          display='flex'
          alignItems='center'
          justifyContent='center'
          mb={1}
        >
          Blog
        </Box>
        <Typography
          whiteSpace='initial'
          overflow='hidden'
          textOverflow='ellipsis'
          display='-webkit-box'
          sx={{ WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
          variant='h3'
          fontSize={[, , , , '22px']}
          maxWidth={340}
          fontWeight='600'
          color='white'
        >
          {title}
        </Typography>

        <Box display='flex' alignItems='center' mt={1}>
          <Image
            style={{ borderRadius: '100%' }}
            objectFit='contain'
            height={38}
            width={38}
            src={authorImage}
            alt={author}
          />
          <Box ml={2} width={[130, 200]}>
            <Typography fontSize={'10px !important'} color='white'>
              Escrito por
            </Typography>
            <Typography fontSize={'12px !important'} fontWeight={600} color='white'>
              {author}
            </Typography>
            <Typography
              fontSize={'10px !important'}
              color='white'
              whiteSpace='nowrap'
              overflow='hidden'
              textOverflow='ellipsis'
            >
              {authorBio}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box flex={1} position='relative' sx={{ bgcolor: 'var(--mui-palette-primary-main)' }}>
        <Image src={image} alt={title} fill layout='fill' style={{ objectFit: 'cover' }} />
        <Box
          flex={1}
          height='116%'
          position='absolute'
          left={-1}
          top={'-8%'}
          width={180}
          sx={{
            borderRadius: '100%',
            border: '10px solid var(--mui-palette-primary-main)',
            outline: '150px solid var(--mui-palette-primary-main)',
            clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)',
          }}
        />
      </Box>
    </Box>
  )
}
