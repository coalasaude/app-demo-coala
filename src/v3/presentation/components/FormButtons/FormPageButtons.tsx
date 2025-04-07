import NavbarActions from '../NavbarActions'

import { FormButtons } from './FormButtons'
import { FormButtonsProps } from './types'

export const FormPageButtons = ({ maxWidth, minWidth, fullWidth, ...props }: FormButtonsProps) => {
  return (
    <>
      <NavbarActions>
        <FormButtons {...props} fullWidth={fullWidth} maxWidth={maxWidth} minWidth={minWidth} />
      </NavbarActions>
    </>
  )
}
