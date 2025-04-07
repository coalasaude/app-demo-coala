import { Box, Skeleton, Typography } from '@mui/material'

import { useFetchGetBlogPosts } from '@/v3/presentation/hooks/api/@v2/dashboard/useFetchGetBlogPosts'

import { BannerCard } from './components/BannerCard'

export const BlogSection = () => {
  const { data, isLoading } = useFetchGetBlogPosts()

  return (
    <>
      <Typography variant='h2'>Nosso blog</Typography>
      <Box
        height={['168px']}
        display='grid'
        gridTemplateColumns={'1fr 1fr 1fr'}
        gap={2}
        overflow='auto'
      >
        {isLoading && (
          <>
            <Skeleton
              variant='rectangular'
              sx={{ minWidth: [324, 365] }}
              width='100%'
              height={'100%'}
            />
            <Skeleton
              variant='rectangular'
              sx={{ minWidth: [324, 365] }}
              width='100%'
              height={'100%'}
            />
            <Skeleton
              variant='rectangular'
              sx={{ minWidth: [324, 365] }}
              width='100%'
              height={'100%'}
            />
          </>
        )}

        {data?.map((post) => (
          <BannerCard
            key={post.title}
            title={post.title}
            image={post.image}
            link={post.url}
            author={post.author}
            authorImage={post.authorImage}
            category={post.category}
          />
        ))}
      </Box>
    </>
  )
}
