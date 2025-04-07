import { Box, BoxProps, CircularProgress, Stack, Typography, TypographyProps } from '@mui/material'

import ButtonIcon from '@/v3/presentation/components/ButtonIcon'
import { CardTitle } from '@/v3/presentation/components/Cards/CardTitle'
import { CDivider } from '@/v3/presentation/newComponents'

export interface ICContainerContentProps {
  children?: React.ReactNode
  subtitle?: React.ReactNode
  title?: React.ReactNode
  icon?: React.ReactNode
  endComponent?: React.ReactNode
  onClickIcon?: () => void
  onClick?: () => void
  isLoading?: boolean
  startComponent?: React.ReactNode
  sx?: BoxProps['sx']
  titleProps?: TypographyProps
  withDivider?: boolean
  whiteSpace?: BoxProps['whiteSpace']
  hover?: boolean
  noBorder?: boolean
  styleContainer?: BoxProps['sx']
}

export const CContainerContent: React.FC<ICContainerContentProps> = ({
  children,
  subtitle,
  title,
  icon,
  onClickIcon,
  startComponent,
  sx,
  onClick,
  isLoading,
  endComponent,
  titleProps,
  withDivider,
  whiteSpace,
  noBorder,
  hover,
  styleContainer,
}) => {
  const hoverStyle = hover
    ? {
        ':hover': {
          borderColor: 'var(--mui-palette-primary-main)',
          cursor: 'pointer',
        },
      }
    : {}

  return (
    <Stack
      onClick={onClick}
      sx={{
        whiteSpace: whiteSpace,
        display: 'block',
        overflow: 'hidden',
        borderRadius: '8px',
        border: noBorder ? 'none' : '2px solid var(--mui-palette-grey-200)',
        p: 2,
        ...hoverStyle,
        ...styleContainer,
      }}
    >
      {title && (
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: !!children ? 2 : 0,
              ...sx,
            }}
          >
            <Stack direction='row' alignItems='center' spacing={1} width='95%'>
              {!!startComponent && <Box>{startComponent}</Box>}
              <Box maxWidth='80%'>
                {typeof title == 'string' ? <CardTitle {...titleProps}>{title}</CardTitle> : title}
                {typeof subtitle == 'string' ? (
                  <Typography variant='body2' color={'var(--mui-palette-grey-600)'}>
                    {subtitle}
                  </Typography>
                ) : (
                  subtitle
                )}
              </Box>
            </Stack>
            {isLoading ? (
              <CircularProgress color='primary' size={18} />
            ) : (
              <Stack direction='row' alignItems='center' spacing={1}>
                {icon && <ButtonIcon icon={icon} onClick={onClickIcon} />}
                {!!endComponent && endComponent}
              </Stack>
            )}
          </Box>

          {withDivider && <CDivider sx={{ mb: 1, mt: 1 }} />}
        </Box>
      )}
      {!!children && <Box>{children}</Box>}
    </Stack>
  )
}
