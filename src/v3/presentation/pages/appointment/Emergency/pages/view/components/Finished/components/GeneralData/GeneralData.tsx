import { Box } from '@mui/material'

import { AppointmentFinishedStatus } from '@/constants/appointment'

import FooterButtons from '../FooterButtons'
import StatusForm from '../StatusForm'

import GeneralTitle from './GeneralTitle'
type Props = {
  isFinished: boolean
  loading: boolean
  onClose: (isSuccess: boolean) => void
  finishedStatus?: AppointmentFinishedStatus
}
export const GeneralData = ({ isFinished, onClose, loading, finishedStatus }: Props) => {
  return (
    <Box py={2} px={2}>
      <GeneralTitle />
      <Box mt={1}>
        <StatusForm finishedStatus={finishedStatus} />
      </Box>
      <FooterButtons loading={loading} title={isFinished ? 'Atualizar' : ''} onClose={onClose} />
    </Box>
  )
}

export default GeneralData
