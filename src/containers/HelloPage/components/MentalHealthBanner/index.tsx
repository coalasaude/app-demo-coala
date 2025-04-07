import { Box } from '@mui/material'
import { useMemo } from 'react'
import Slider from 'react-slick'

import { BlogCard } from '@/v3/presentation/pages/hello/components/BlogSection/components/BlogCard'

import { useMentalHealthBanner } from './hooks/useMentalHealthBanner'

export const MentalHealthBanner = () => {
  const { banners } = useMentalHealthBanner()

  const shuffledSlides = useMemo(() => {
    return banners.sort(() => 0.5 - Math.random())
  }, [banners])

  if (banners.length === 0)
    return (
      <BlogCard
        title={'Sua família segura e tranquila com a Coala '}
        image={
          'https://cdn.prod.website-files.com/6297a55c26ddb8a3fef94b06/67b5ee1cb0b61eb588c3c344_Design%20sem%20nome%20(2).png'
        }
        author={'Natália Fontenele'}
        authorImage={
          'https://cdn.prod.website-files.com/6297a55c26ddb8a3fef94b06/67b6369b99be6cab36280592_T03DBSQGEJD-U06MKT6632A-d7f4c79a03d3-512.png'
        }
        authorBio={'Marketing'}
        link={'https://coalasaude.com.br/blog/sua-familia-segura-e-tranquila-com-a-coala'}
      />
    )

  if (banners.length === 1) {
    return <Box>{banners[0]}</Box>
  }

  return (
    <Box>
      <Slider
        arrows={false}
        autoplay
        autoplaySpeed={5000}
        dots
        infinite
        slidesToShow={1}
        slidesPerRow={1}
        adaptiveHeight
      >
        {shuffledSlides}
      </Slider>
    </Box>
  )
}
