import Image from 'next/legacy/image'
import { useState } from 'react'

import { BasicRoundContainer } from './styles'
import { CAvatarWithoutImage } from './CAvatarWithoutImage'

type CBasicAvatarProps = {
  src?: string
  variant?: 'organization' | 'user'
  width?: number | string
  height?: number | string
}

export const CBasicAvatar = ({ src, variant = 'user', ...props }: CBasicAvatarProps) => {
  const [isLoadedImage, setIsLoadedImage] = useState(false)

  return (
    <BasicRoundContainer {...props}>
      {src && !isLoadedImage ? (
        <Image
          src={src}
          alt='Avatar'
          layout='fill'
          objectFit='cover'
          style={{ borderRadius: '50%' }}
          onLoad={() => setIsLoadedImage(true)}
        />
      ) : (
        <CAvatarWithoutImage variant={variant} />
      )}
    </BasicRoundContainer>
  )
}
