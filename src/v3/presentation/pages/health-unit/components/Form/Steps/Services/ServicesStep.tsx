import { useFormContext } from 'react-hook-form'
import { Box, BoxProps } from '@mui/material'

import * as Form from '@/v3/presentation/pages/health-unit/components/Form'
import {
  NavigationButtons,
  NavigationButtonsProps,
} from '@/v3/presentation/pages/health-unit/components/Form/NavigationButtons'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { useLayout } from '@/hooks/useLayout'

import { steps } from '../constants'

import { Appointment } from './components/Cards'

type ServiceStepProps = {
  buttonsProps?: NavigationButtonsProps
  groupProps?: BoxProps
}

export const ServiceStep = ({ buttonsProps, groupProps }: ServiceStepProps) => {
  const { queryParam, setQueryParam } = useUrlQueryControl({ queryName: 'step' })
  const { trigger } = useFormContext()
  const { showSnackBar } = useLayout()

  const handleNext = () => {
    trigger('appointment').then((isValid) => {
      if (isValid) {
        setQueryParam(steps[queryParam].next)
      } else {
        showSnackBar({
          type: 'error',
          message: 'Verifique os campos inválidos',
        })
      }
    })
  }

  const handleBack = () => {
    setQueryParam(steps[queryParam].back || 'unit')
  }

  return (
    <Form.Container mt={2}>
      <Box sx={{ px: 2 }}>
        <Form.CardGroup {...groupProps}>
          <Appointment />
        </Form.CardGroup>

        <NavigationButtons
          back={{ onClick: handleBack }}
          next={{ onClick: handleNext }}
          {...buttonsProps}
        />
      </Box>
    </Form.Container>
  )
}
