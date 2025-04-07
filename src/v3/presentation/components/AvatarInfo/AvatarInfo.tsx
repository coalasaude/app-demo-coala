import React from 'react'
import { Box, BoxProps, TypographyProps } from '@mui/material'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { ImageDialog } from '@/containers/users/view/components/dialog/ImageDialog'
import { ContentButton } from '@/containers/users/view/components/Tabs/ContentButton'

import { QueryKeyEnum } from '../../enums/query-keys.enum'
import { CAvatar } from '../../newComponents'

import { ImageContainer, InfoContainer, MainText, StyledImage, SubText } from './styles'

export type AvatarInfoSize = 'small' | 'normal' | 'unset'

export interface AvatarInfoProps {
  title: string
  subtitle?: string
  imageUrl?: string
  titleProps?: TypographyProps
  containerProps?: BoxProps
  isEdit?: boolean
  userId?: number
  size?: AvatarInfoSize
  ImageComponent?: React.ReactNode
  hideText?: boolean
  titleComponent?: React.ReactNode
}

const sizeDictionary: Record<AvatarInfoSize, number | undefined> = {
  small: 24,
  normal: 44,
  unset: undefined,
}

export const AvatarInfo = ({
  imageUrl,
  title,
  subtitle,
  titleProps,
  containerProps,
  isEdit,
  userId,
  ImageComponent,
  size = 'unset',
  titleComponent,
  hideText = false,
}: AvatarInfoProps) => {
  const [openModal, setOpenModal] = useState(false)
  const [isLoadedImage, setIsLoadedImage] = useState(false)
  const queryClient = useQueryClient()
  return (
    <Box {...containerProps}>
      <InfoContainer hideText>
        <ImageContainer
          width={sizeDictionary[size]}
          height={sizeDictionary[size]}
          haveImageComponent={!!ImageComponent}
        >
          {imageUrl && isLoadedImage ? (
            <>
              <StyledImage
                src={`${imageUrl}`}
                alt={title}
                isEdit={isEdit}
                width={128}
                height={128}
                priority
                {...(isEdit && {
                  onClick: () => setOpenModal(true),
                })}
                onLoad={() => setIsLoadedImage(true)}
              />
            </>
          ) : (
            <>
              {isEdit && (
                <>
                  <ContentButton onClick={() => setOpenModal(true)} />
                </>
              )}
              {ImageComponent ? (
                ImageComponent
              ) : (
                <CAvatar
                  imageUrl={imageUrl}
                  type='photo'
                  size={'large'}
                  isClickable
                  photoFallback='initials'
                  name={title}
                />
              )}
            </>
          )}
        </ImageContainer>
        {!hideText && (
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
            }}
            {...containerProps}
          >
            <MainText variant='h5' {...titleProps}>
              {title}
              {titleComponent}
            </MainText>
            {subtitle && <SubText variant='body2'>{subtitle}</SubText>}
          </Box>
        )}
      </InfoContainer>
      {isEdit && (
        <ImageDialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.USER] })
          }}
          id={userId}
          url={imageUrl}
        />
      )}
    </Box>
  )
}
