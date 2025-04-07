import { Box, BoxProps } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/router'

import * as Form from '@/v3/presentation/pages/health-unit/components/Form'
import {
  NavigationButtons,
  NavigationButtonsProps,
} from '@/v3/presentation/pages/health-unit/components/Form/NavigationButtons'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import { useLayout } from '@/hooks/useLayout'

import { steps } from '../constants'

import { Financial } from './components/Cards'

type FinancialStepProps = {
  buttonsProps?: NavigationButtonsProps
  groupProps?: BoxProps
}

export const FinancialStep = ({ buttonsProps, groupProps }: FinancialStepProps) => {
  const { queryParam, setQueryParam } = useUrlQueryControl({ queryName: 'step' })
  const { trigger } = useFormContext()
  const { showSnackBar } = useLayout()
  const { pathname } = useRouter()
  const isEdit = pathname.includes('edit')

  const handleNext = () => {
    trigger('financial').then((isValid) => {
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
          <Financial noBorder={!isEdit} />
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
