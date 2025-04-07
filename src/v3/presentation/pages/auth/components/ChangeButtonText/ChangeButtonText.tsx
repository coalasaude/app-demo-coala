import { Box, BoxProps, Typography } from '@mui/material'

type IChangeButtonText = Omit<BoxProps, 'onClick'> & {
  text?: string
  buttonText?: string
  onClick?: () => void
}

export const ChangeButtonText = ({
  text = '',
  buttonText = 'Alterar',
  onClick,
  ...props
}: IChangeButtonText) => {
  return (
    <Box display='flex' alignItems='center' {...props}>
      {text && (
        <Typography variant='body1' pr={1}>
          {text}
        </Typography>
      )}
      {onClick && (
        <Typography
          pr={1}
          onClick={onClick}
          color='primary'
          variant='body1'
          sx={{
            textDecoration: 'underline',
            cursor: 'pointer',
            ':hover': {
              opacity: 0.8,
            },
            ':active': {
              opacity: 0.6,
            },
          }}
        >
          {buttonText}
        </Typography>
      )}
    </Box>
  )
}
