import { Box, Typography } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import { GridItem, GridWrapper } from '@/components/Grid'
import { CContainerContent, CDisplayRecord } from '@/v3/presentation/newComponents'
import { AvatarInfo } from '@/v3/presentation/components/AvatarInfo'
import { UserStatus } from '@/types/user'
import { RelativeModel } from '@/v3/domain/@v2/users/relative.model'

type ResponsibleCardProps = {
  responsible: RelativeModel
  onClickCard?: (id?: number) => void
  canClickCard?: boolean
  endComponent?: JSX.Element
}

export const ResponsibleCard = ({
  responsible,
  onClickCard,
  canClickCard,
  endComponent,
}: ResponsibleCardProps) => {
  return (
    <CContainerContent
      title={responsible.getFullName()}
      withDivider
      sx={{ justifyContent: 'flex-start', gap: '8px' }}
      subtitle={
        <Box
          display='flex'
          alignItems='center'
          gap={0.5}
          sx={{
            color:
              responsible.status === UserStatus.ACTIVE
                ? 'var(--mui-palette-success-main)'
                : 'var(--mui-palette-grey-400)',
          }}
        >
          <Typography sx={{ color: 'inherit' }}>
            {responsible.status === UserStatus.ACTIVE ? 'Ativo' : 'Pendente'}
          </Typography>
          <InfoOutlinedIcon sx={{ width: '13px' }} />
        </Box>
      }
      hover={canClickCard}
      onClick={() => (canClickCard && onClickCard ? onClickCard(responsible.id) : undefined)}
      endComponent={endComponent}
      startComponent={
        <AvatarInfo
          hideText
          title={responsible.getFullName() || ''}
          imageUrl={responsible?.image?.url}
        />
      }
    >
      <GridWrapper>
        <GridItem xs={12} md={8}>
          <CDisplayRecord
            label='Email'
            value={responsible.email || '-'}
            withDivider={false}
            clickable
          />
        </GridItem>
        <GridItem xs={12} md={4}>
          <CDisplayRecord
            label='Telefone'
            value={responsible.getFormattedPhone() || '-'}
            withDivider={false}
            clickable
          />
        </GridItem>
      </GridWrapper>
    </CContainerContent>
  )
}
