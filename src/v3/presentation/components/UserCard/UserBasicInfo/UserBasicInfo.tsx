import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import { AvatarInfo } from '../../AvatarInfo'
import ButtonIcon from '../../ButtonIcon'
import ContentWrapper from '../../layout/ContentWrapper'

export interface UserBasicInfoProps {
  name: string
  infoText?: string
  imageUrl?: string
  onEdit?: () => void
  userId?: number
  noPadding?: boolean
}

export const UserBasicInfo = ({
  imageUrl,
  name,
  infoText,
  onEdit,
  userId,
  noPadding,
}: UserBasicInfoProps) => {
  return (
    <>
      <ContentWrapper
        display='flex'
        justifyContent='space-between'
        disableContentPadding={noPadding}
      >
        <AvatarInfo
          imageUrl={imageUrl}
          subtitle={infoText}
          title={name}
          isEdit={!!onEdit}
          userId={userId}
        />
        {onEdit && <ButtonIcon onClick={onEdit} icon={<EditOutlinedIcon />} />}
      </ContentWrapper>
    </>
  )
}
