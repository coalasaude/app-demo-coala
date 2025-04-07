import { Dialog } from '@mui/material'

import { CDialogueWithSteps } from '@/v3/presentation/newComponents/layout/CDialogueWithSteps'

import { ModalSteps, useModalControlSteps } from './hooks/useModalControl'
import { InformationStep } from './steps/InformationStep/InformationStep'
import { PasswordStep } from './steps/PasswordStep'

export interface ModalCertificateProps {
  open?: boolean
  onClose: () => void
  submitPassword: () => Promise<void>
}

export const WithStepModal = ({ open, onClose, submitPassword }: ModalCertificateProps) => {
  const {
    onNextStep,
    onGoBack,
    step,
    stepperRef,
    cancelButtonLabel,
    confirmButtonLabel,
    isLoading,
  } = useModalControlSteps({ submitPassword })

  return (
    <Dialog
      open={!!open}
      onClose={onClose}
      aria-labelledby='modal-with-step-dialog'
      aria-describedby='modal-with-step-dialog'
    >
      <CDialogueWithSteps
        title='Atenção'
        confirmButtonLabel={confirmButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
        onConfirm={onNextStep}
        onClose={onClose}
        step={step}
        stepsInfo={['Informações', 'Senha']}
        stepperRef={stepperRef}
        onGoBack={onGoBack}
        isLoading={isLoading}
      >
        <InformationStep key={ModalSteps.INFORMATION} />
        <PasswordStep key={ModalSteps.PASSWORD} />
      </CDialogueWithSteps>
    </Dialog>
  )
}
