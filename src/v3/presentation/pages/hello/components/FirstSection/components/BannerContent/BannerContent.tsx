import { Box, Skeleton } from '@mui/material'
import Slider from 'react-slick'

import { useFetchGetBlogPosts } from '@/v3/presentation/hooks/api/@v2/dashboard/useFetchGetBlogPosts'

import { BannerCard } from './components/BannerCard'

export const BannerContent = () => {
  const { data, isLoading } = useFetchGetBlogPosts()

  return (
    <Box
      sx={{
        '.slick-dots': { bottom: '5px' },
        '.slick-list': { height: '100% !important' },
        '.slick-slider': { height: '100%' },
        '.slick-slide': { height: '100%', '> div': { height: '100%' } },
        '.slick-track': { height: '100%' },
      }}
      height={['185px', '210px']}
    >
      {isLoading && (
        <Skeleton variant='rectangular' width='100%' height={'100%'} sx={{ mb: '-32px' }} />
      )}

      {data && (
        <Slider
          arrows={false}
          autoplay
          autoplaySpeed={5000}
          dots
          infinite
          slidesToShow={1}
          slidesPerRow={1}
        >
          {data.map((post) => (
            <BannerCard
              key={post.title}
              title={post.title}
              image={post.image}
              link={post.url}
              author={post.author}
              authorImage={post.authorImage}
              authorBio={post.authorBio}
            />
          ))}
        </Slider>
      )}
    </Box>
  )
}
