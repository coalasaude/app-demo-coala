import { useFormContext } from 'react-hook-form'

import { StepContainer } from '../StepContainer'

export type StepProps = {
  schemaProperty?: string
  children: React.ReactNode

  isLoading?: boolean
  noPadding?: boolean
  noBorder?: boolean

  onNext?: () => void
  onBack?: () => void
}

export const Step = ({
  onNext,
  onBack,
  children,
  schemaProperty,
  isLoading,
  noPadding,
  noBorder,
}: StepProps) => {
  const { trigger } = useFormContext()

  const handleNext = async () => {
    if (!schemaProperty) {
      onNext && onNext()
      return
    }

    const isValid = await trigger(schemaProperty)
    if (isValid) {
      onNext && onNext()
    }
  }

  return (
    <StepContainer
      onConfirm={onNext && handleNext}
      onCancel={onBack}
      confirmLabel={onNext ? 'Próximo' : 'Finalizar'}
      isLoading={isLoading}
      noPadding={noPadding}
      noBorder={noBorder}
    >
      {children}
    </StepContainer>
  )
}
