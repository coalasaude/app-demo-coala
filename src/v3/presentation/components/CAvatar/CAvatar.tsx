import { useState } from 'react'

import { CImageModal } from '../CImageModal'

import { EditButton, EditButtonContainer, RoundedContainer } from './styles'
import { CBasicAvatar } from './CBasicAvatar'

interface CAvatarProps {
  src: string | undefined
  variant?: 'organization' | 'user'
  width?: number
  height?: number

  canEdit?: boolean
  onEdit?: (file?: File) => void
}

export const CAvatarWithModal = ({
  src,
  variant = 'user',
  canEdit,
  onEdit,
  ...props
}: CAvatarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  canEdit = false as unknown as any //! remove this line

  const handleEdit = (file?: File) => {
    onEdit && onEdit(file)
  }

  const handleCanEdit = () => {
    if (canEdit) setIsOpen((prev) => !prev)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <RoundedContainer canEdit={canEdit} onClick={handleCanEdit} {...props}>
        <CBasicAvatar src={src} variant={variant} />

        {canEdit && (
          <EditButtonContainer>
            <EditButton />
          </EditButtonContainer>
        )}
      </RoundedContainer>

      <CImageModal
        variant={variant}
        open={isOpen}
        url={src}
        onClose={handleClose}
        onCapture={handleEdit}
        onUpload={handleEdit}
        onRemove={handleEdit}
      />
    </>
  )
}
