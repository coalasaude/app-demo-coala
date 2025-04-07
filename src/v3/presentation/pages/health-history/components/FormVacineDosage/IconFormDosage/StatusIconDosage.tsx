import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import { useFormContext } from 'react-hook-form'

import { IVaccineFormField } from '../schema'

export const StatusIconDosage = ({ prefix }: { prefix: string }) => {
  const form = useFormContext()

  const data = form.watch(prefix) as IVaccineFormField

  const isCurrentDosageFilled =
    !!data?.dosageDates?.length && data.dosageDates.every((date) => !!new Date(date)?.getDate())
  const isCurrentReinforcementFilled = data?.reinforcementDates?.every(
    (date) => !!new Date(date)?.getDate()
  )

  if (isCurrentDosageFilled && isCurrentReinforcementFilled)
    return <CheckCircleOutlineOutlinedIcon />
  return <FlagOutlinedIcon />
}
