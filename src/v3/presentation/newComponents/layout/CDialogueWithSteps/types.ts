import { CStepperRefProps } from '../CStepper'

export interface CDialogueProps {
  onConfirm: () => Promise<void> | void
  onGoBack: () => void
  onClose?: () => void
  title?: string
  confirmButtonLabel: string
  cancelButtonLabel?: string
  children: any
  stepsInfo: string[]
  step: string
  stepperRef: React.RefObject<CStepperRefProps<string | number>>
  isLoading?: boolean
}
