import { Box, Typography } from '@mui/material'

import { CAvatar, CContainerContent } from '@/v3/presentation/newComponents'
import { UserStatus } from '@/types/user'
import { CCheckbox } from '@/v3/presentation/newComponents'

export type FormDependentCardProps = {
  status?: UserStatus
  name: string
  lastName: string
  checked: boolean
  setChecked: (checked: boolean) => void
  imageUrl?: string
}

const StatusColor: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: 'var(--mui-palette-success-main)',
  [UserStatus.INACTIVE]: 'var(--mui-palette-error-main)',
  [UserStatus.FIRST_ACCESS]: 'var(--mui-palette-warning-main)',
  [UserStatus.NO_ACCESS]: 'var(--mui-palette-grey-400)',
  [UserStatus.TRIAL]: 'var(--mui-palette-primary-main)',
}

export const CheckBoxDependentCard = ({
  checked,
  setChecked,
  status,
  name,
  lastName,
  imageUrl,
}: FormDependentCardProps) => {
  return (
    <CContainerContent hover onClick={() => setChecked(!checked)}>
      <Box display='flex' alignItems='center' gap={1}>
        <CCheckbox checked={checked} inputProps={{ 'aria-label': 'controlled' }} />
        <Box position='relative'>
          <CAvatar
            imageUrl={imageUrl}
            size='large'
            type={imageUrl ? 'photo' : 'initials'}
            name={name + ' ' + lastName}
          />
          <Box
            border='solid 2px var(--mui-palette-background-default)'
            borderRadius='50%'
            width={12}
            height={12}
            position='absolute'
            right={0}
            bottom={0}
            bgcolor={status ? StatusColor[status] : 'var(--mui-palette-grey-400)'}
          />
        </Box>
        <Typography variant='body1' noWrap textOverflow='ellipsis'>
          {name} {lastName}
        </Typography>
      </Box>
    </CContainerContent>
  )
}
