import { Box } from '@mui/material'

import MentalHealthBannerLogo from '/public/assets/images/HelloPage/MentalHealth/MentalHealthBannerLogo.svg'

import { colorSchemaMap } from '@/v3/presentation/constants/banner-color-schema-map'

type ContainerBackgroundGridProps = {
  color: 'primary' | 'secondary'
}

export const CardCoalaLogo: React.FC<ContainerBackgroundGridProps> = ({ color }) => {
  return (
    <Box
      px={3}
      display='flex'
      alignItems={['center']}
      width='100%'
      justifyContent='center'
      sx={{
        backgroundColor: colorSchemaMap.medium[color],
        borderBottomLeftRadius: '8px',
      }}
    >
      <MentalHealthBannerLogo width={90} />
    </Box>
  )
}
