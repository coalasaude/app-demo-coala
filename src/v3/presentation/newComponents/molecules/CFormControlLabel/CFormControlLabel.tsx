import { FormControlLabel, FormControlLabelProps } from '@mui/material'

interface IFormControlLabel extends FormControlLabelProps {
  label: React.ReactNode
  control: React.ReactElement<any, any>
}

export const CFormControlLabel = ({ label, control, ...props }: IFormControlLabel) => {
  return <FormControlLabel label={label} control={control} {...props} />
}
