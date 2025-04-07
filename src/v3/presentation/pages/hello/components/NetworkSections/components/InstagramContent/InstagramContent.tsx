import { Box, Typography } from '@mui/material'
import Image from 'next/image'

import CoalaSocialLogo from '/public/assets/images/HelloPage/Network/CoalaSocialLogo.png'

import { extractInstagramPostId } from '@/v3/utils/extractInstagramPostId'
import { WebViewManager } from '@/services/WebView'

export function InstagramContent({ url, comment }: { url: string; comment?: string }) {
  const formattedText = comment?.split(/(\s+|\n)/).map((segment, index) => {
    if (segment.startsWith('#')) {
      return (
        <Typography component='span' key={index} color={'var(--mui-palette-primary-main)'}>
          {segment}
        </Typography>
      )
    }
    return segment === '\n' ? <br key={index} /> : segment + ' '
  })

  return (
    <Box
      onClick={() => WebViewManager.open(url, '_blank')}
      sx={{
        maxHeight: ['fit-content', 292],
        p: '20px',
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: 2,
        border: '1px solid var(--mui-palette-grey-200)',
      }}
    >
      <Box display='flex' gap={1} alignItems='center' pb={2}>
        <Image src={CoalaSocialLogo.src} alt='Coala Saúde' width={25} height={25} />
        <Typography variant='h4' sx={{ textDecoration: 'underline' }}>
          coalasaude
        </Typography>
      </Box>
      <Box
        display='grid'
        gridTemplateColumns={['1fr', '195px 1fr']}
        gap={2}
        sx={{ overflow: 'hidden', gap: 1 }}
      >
        <Box my={'auto'} overflow='hidden' mt={-1}>
          <Box
            mt={-9}
            mb={-2}
            mx={-1}
            width={['calc(100vw - 60px)', 195]}
            height={[`calc((100vw - 60px)*1.3)`, 290]}
            overflow='hidden'
          >
            <iframe
              src={`https://www.instagram.com/p/${extractInstagramPostId(url)}/embed`}
              width='100%'
              height='100%'
              scrolling='no'
              allowTransparency
            />
          </Box>
        </Box>
        <Box>
          <Typography
            whiteSpace={'pre-line'}
            fontSize={12}
            overflow='hidden'
            textOverflow='ellipsis'
            display='-webkit-box'
            sx={{ WebkitLineClamp: ['inherit', 11], WebkitBoxOrient: 'vertical' }}
          >
            {formattedText}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
