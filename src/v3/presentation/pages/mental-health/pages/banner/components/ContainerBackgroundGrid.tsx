import { Box, BoxProps } from '@mui/material'

import BgGrid from '/public/assets/images/HelloPage/MentalHealth/MentalHealthBannerGrid.png'

type ContainerBackgroundGridProps = React.PropsWithChildren<
  { backgroundColor?: string } & BoxProps['sx']
>

export const ContainerBackgroundGrid: React.FC<ContainerBackgroundGridProps> = ({
  children,
  backgroundColor = 'var(--mui-palette-primary-main)',
  ...props
}) => {
  return (
    <Box
      display='flex'
      flexDirection={'column'}
      height={[undefined, undefined, 571]}
      minHeight={[571, 571, undefined]}
      px={['30px', '30px', '100px']}
      py={'50px'}
      pb={['12px', '12px', '50px']}
      sx={{
        backgroundColor,
        borderRadius: '8px',
        backgroundImage: `url(${BgGrid.src})`,
        ...props,
      }}
    >
      {children}
    </Box>
  )
}
