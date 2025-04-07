import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Box, BoxProps, Typography } from '@mui/material'

import { GridItem, GridWrapper } from '@/components/Grid'
import { AvatarInfo } from '@/v3/presentation/components/AvatarInfo'
import ButtonIcon from '@/v3/presentation/components/ButtonIcon'
import { CardContent } from '@/v3/presentation/components/Cards/CardContent'
import { CCardBaseProps } from '@/v3/presentation/newComponents'

export type UserAccessCardsProps = {
  title: string
  gridItemDesktop?: number
  options: {
    id?: number
    title: string
    onClick?: () => void
    subtitle?: string
    imageUrl?: string
    ImageComponent?: React.ReactNode
    cardProps?: CCardBaseProps
  }[]
} & BoxProps

export const UserAccessCards = ({
  title,
  options,
  gridItemDesktop = 3,
  ...props
}: UserAccessCardsProps) => {
  return (
    <Box {...props}>
      <Typography variant='body2' color='var(--mui-palette-grey-500) !important' mb={1}>
        {title}
      </Typography>
      <GridWrapper>
        {options.map((option) => (
          <GridItem key={option.id} xs={12} md={gridItemDesktop}>
            <CardContent
              onClick={option.onClick}
              hover={true}
              sx={{ paddingX: 1, overflow: 'hidden' }}
              isInteractive
              {...option.cardProps}
            >
              <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>
                <AvatarInfo
                  imageUrl={option.imageUrl}
                  subtitle={option.subtitle}
                  title={option.title}
                  titleProps={{ mb: -0.5, variant: 'h6', fontWeight: '600' }}
                  ImageComponent={option.ImageComponent}
                />
                <ButtonIcon icon={<KeyboardArrowRightIcon />} />
              </Box>
            </CardContent>
          </GridItem>
        ))}
      </GridWrapper>
    </Box>
  )
}
