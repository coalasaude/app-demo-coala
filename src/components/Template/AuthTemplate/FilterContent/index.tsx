import React, { useRef, useState } from 'react'
import { Box } from '@mui/system'
import { Tune } from '@mui/icons-material'
import { useSpring, animated } from '@react-spring/web'
import { Button } from '@mui/material'

import useMediaQuery from '@/hooks/useMediaQuery'

import FilterContentButtonPortal from './FilterContentButtonPortal'

export const id = 'filter-content'
export const FilterContent = ({
  children,
  RenderSmallDeviceButtons,
}: {
  children: React.ReactNode
  RenderSmallDeviceButtons?: React.ReactNode
}) => {
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const elementRef = useRef<HTMLDivElement>()
  const isSmallDevice = useMediaQuery('sm')
  const styles = useSpring({
    from: {
      transform: showFilter ? 'translateX(-150px)' : 'translateX(0)',
    },
    to: {
      width: '100%',
      opacity: showFilter ? '1' : '0',
      overflow: 'hidden',
      height: isSmallDevice ? (showFilter ? '100%' : '0') : '100%',
      transform: showFilter ? 'translateX(0px)' : 'translateX(-150px)',
    },
    config: {
      duration: 100,
    },
  })

  return (
    <Box
      display='flex'
      width='100%'
      px={isSmallDevice ? 1 : 0}
      flexDirection={isSmallDevice ? 'column' : 'row'}
    >
      <Box mr={2} mb={2} display='flex' width={isSmallDevice ? '100%' : 'auto'} id='filter-content'>
        <Button
          variant='text'
          onClick={() => setShowFilter(!showFilter)}
          size='medium'
          fullWidth={!!isSmallDevice}
        >
          <Tune /> <Box ml={1}>Filtros</Box>
        </Button>
        {isSmallDevice && RenderSmallDeviceButtons}
      </Box>
      <Box width='100%' mt={0}>
        <animated.div
          style={{
            ...styles,
            visibility: showFilter ? 'visible' : 'hidden',
            height: isSmallDevice ? (showFilter ? '100%' : '0') : '100%',
            transition: 'all .1s cubic-bezier(0, 0.28, 0.32, 1.18)',
          }}
        >
          <Box sx={{ overflow: 'hidden' }} ref={elementRef}>
            {children}
          </Box>
        </animated.div>
      </Box>
    </Box>
  )
}

FilterContent.ButtonsPortal = FilterContentButtonPortal

export default FilterContent
