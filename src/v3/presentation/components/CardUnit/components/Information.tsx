import { Box } from '@mui/material'

import RedInformationIcon from '/public/assets/svg/HealthUnitRedInformation.svg'

import CardUnitCaption from './CardUnitCaption'

type Props = {
  title: string
}

export const Information = ({ title }: Props) => {
  return (
    <Box display='flex' alignItems='center' gap={1}>
      <Box display='flex' alignItems='center' gap={1}>
        <CardUnitCaption title={title} color='var(--mui-palette-error-main)' />
        <RedInformationIcon />
      </Box>
    </Box>
  )
}
