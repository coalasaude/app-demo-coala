import { Box, Typography } from '@mui/material'

import { CDisplayRecord, CDivider, CDisplayRecordProps } from '@/v3/presentation/newComponents'

import { UserBasicInfoProps, UserBasicInfo } from '../UserBasicInfo'
import CardLink, { CardLinkProps } from '../../CardLink'
import CardBody from '../../CardBody'

import { PaperWrapper } from './style'

interface UserInfoCardProps {
  basicInfo: UserBasicInfoProps
  bodyItems: CDisplayRecordProps[]
  linkItems?: CardLinkProps[]
}

export const UserInfoCard = ({ basicInfo, bodyItems, linkItems }: UserInfoCardProps) => {
  return (
    <PaperWrapper>
      <UserBasicInfo {...basicInfo} />
      <CDivider />
      <CardBody>
        {bodyItems.map((item, index) => (
          <CDisplayRecord
            {...item}
            withDivider={false}
            value={
              <Typography lineHeight={1.5} variant='h6' fontWeight={400}>
                {item.value}
              </Typography>
            }
            key={`${item.value}${index}`}
          />
        ))}
      </CardBody>
      {linkItems && (
        <>
          <CDivider sx={{ mt: 1 }} />
          <CardBody gap={[0, 2]}>
            {linkItems.map((item, index) => (
              <CardLink {...item} key={`${item.label}${index}`} />
            ))}
            <Box display={['none', 'block']} />
          </CardBody>
        </>
      )}
    </PaperWrapper>
  )
}
