import Button from '@/v3/presentation/components/Button'
import useMediaQuery from '@/hooks/useMediaQuery'

import { Container, StyledDivider } from './styles'

type ButtonProps = {
  label?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  hidden?: boolean
}

export type NavigationButtonsProps = {
  back?: ButtonProps
  next?: ButtonProps
}

export const NavigationButtons = ({ back, next }: NavigationButtonsProps) => {
  const isSmall = useMediaQuery('sm')

  return (
    <>
      {!isSmall && <StyledDivider />}
      <Container>
        {!back?.hidden && (
          <Button type={back?.type} variant='outlined' onClick={back?.onClick}>
            {back?.label || 'Voltar'}
          </Button>
        )}

        {!next?.hidden && (
          <Button type={next?.type} onClick={next?.onClick}>
            {next?.label || 'Próximo'}
          </Button>
        )}
      </Container>
    </>
  )
}
