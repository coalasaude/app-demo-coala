import { Box, BoxProps } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useRouter } from 'next/router'

import * as Form from '@/v3/presentation/pages/health-unit/components/Form'
import { useUrlQueryControl } from '@/v3/presentation/hooks/useUrlQueryControl'
import {
  NavigationButtonsProps,
  NavigationButtons,
} from '@/v3/presentation/pages/health-unit/components/Form/NavigationButtons'
import {
  Address,
  Administrative,
  Contacts,
} from '@/v3/presentation/pages/health-unit/components/Form/Steps/Unit/components/Cards'
import { useLayout } from '@/hooks/useLayout'

import { steps } from '../constants'

type UnitStepProps = {
  sections?: ('administrative' | 'contacts' | 'address')[] | string[]
  buttonsProps?: NavigationButtonsProps
  groupProps?: BoxProps
}

export const UnitStep = ({ sections, buttonsProps, groupProps }: UnitStepProps) => {
  const { trigger } = useFormContext()
  const { queryParam, setQueryParam } = useUrlQueryControl({ queryName: 'step' })
  const { showSnackBar } = useLayout()
  const { pathname } = useRouter()

  const handleNext = () => {
    trigger('company').then((isValid) => {
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

  const isEdit = pathname.includes('edit')

  if (!sections) sections = ['administrative', 'contacts', 'address']

  return (
    <Form.Container mt={2}>
      <Box sx={{ px: 2 }}>
        <Form.CardGroup {...groupProps}>
          {sections?.includes('administrative') && <Administrative noBorder={!isEdit} />}
          {sections?.includes('contacts') && <Contacts noBorder={!isEdit} />}
          {sections?.includes('address') && <Address noBorder={!isEdit} />}
        </Form.CardGroup>

        <NavigationButtons
          back={{ hidden: true }}
          next={{ onClick: handleNext }}
          {...buttonsProps}
        />
      </Box>
    </Form.Container>
  )
}
