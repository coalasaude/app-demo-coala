import { FilterList } from '@mui/icons-material'
import { Box, Button, ClickAwayListener, Typography } from '@mui/material'
import React, { useState } from 'react'
import SimpleBar from 'simplebar-react'

import useMediaQuery from '@/hooks/useMediaQuery'

import { NFilterContainer } from './styles'
import FilterContent from './NFilterContent'
import NFilterMobile from './index.mobile'

export const NFilter = ({
  children,
  onCleanAll,
  onApplyFilters,
  positionTop,
  positionRight,
  noTitle,
  align,
}: {
  children?: React.ReactNode
  onCleanAll?: () => void
  onApplyFilters?: () => void
  positionTop?: number
  positionRight?: number
  noTitle?: boolean
  align?: 'right' | 'left'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMediaQuery('sm')

  if (isMobile) {
    return (
      <NFilterMobile
        onCleanAll={onCleanAll}
        onApplyFilters={onApplyFilters}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        positionTop={positionTop}
        positionRight={positionRight}
      >
        {children}
      </NFilterMobile>
    )
  }

  return (
    <Box position='relative'>
      <Button
        variant='text'
        onClick={() => setIsOpen(true)}
        size='medium'
        sx={{ border: '1px solid var(--mui-palette-grey-400)' }}
      >
        <FilterList />
        {noTitle ? null : <Box ml={1}>Filtros</Box>}
      </Button>

      {isOpen && (
        <ClickAwayListener onClickAway={() => setIsOpen(false)}>
          <NFilterContainer align={align}>
            <SimpleBar
              style={{
                maxHeight: '600px',
                padding: 16,
              }}
            >
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='h4'>Filtros</Typography>
                {onCleanAll && (
                  <Typography
                    color='info.main'
                    variant='subtitle2'
                    ml='auto'
                    className='cursor-pointer'
                    onClick={onCleanAll}
                  >
                    Limpar todos
                  </Typography>
                )}
              </Box>
              {children}
              {onApplyFilters && (
                <Box display='flex' justifyContent='center' mt={2}>
                  <Button
                    variant='outlined'
                    onClick={() => {
                      onApplyFilters()
                      setIsOpen(false)
                    }}
                    color='primary'
                    fullWidth
                    size='medium'
                  >
                    Aplicar
                  </Button>
                </Box>
              )}
            </SimpleBar>
          </NFilterContainer>
        </ClickAwayListener>
      )}
    </Box>
  )
}

NFilter.Content = FilterContent

export default NFilter
