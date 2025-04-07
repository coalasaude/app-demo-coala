import { Stack, StackProps, Typography, TypographyProps } from '@mui/material'
import { styled } from '@mui/material/styles'

interface StyledContainerProps extends StackProps {
  selected: boolean
  isClickable?: boolean
  componentColor: string
}

export const StyledContainer = styled((props: StyledContainerProps) => <Stack {...props} />)(
  ({ theme, selected, isClickable, componentColor }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: theme.spacing(0.5),
    cursor: isClickable ? 'pointer' : 'default',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(1.5),
    paddingTop: selected ? theme.spacing(2) : theme.spacing(1),
    paddingBottom: selected ? theme.spacing(2) : theme.spacing(1),

    backgroundColor: selected ? theme.palette.grey[100] : 'transparent',

    borderLeft: selected ? `4px solid ${theme.palette.primary.main}` : '4px solid transparent',

    svg: {
      width: theme.spacing(3.5),
      color: componentColor,
      height: theme.spacing(3.5),
    },
  }),
)

interface CustomTypographyProps extends TypographyProps {
  componentColor: string
}

export const StyledTitle = styled((props: CustomTypographyProps) => (
  <Typography variant='h5' {...props} />
))(({ componentColor }) => ({
  color: componentColor,
}))

export const StyledDescription = styled((props: CustomTypographyProps) => (
  <Typography variant='caption' {...props} />
))(({ componentColor }) => ({
  color: componentColor,
}))

export const StyledTextStack = styled(Stack)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  flexDirection: 'column',
  width: '100%',
}))
