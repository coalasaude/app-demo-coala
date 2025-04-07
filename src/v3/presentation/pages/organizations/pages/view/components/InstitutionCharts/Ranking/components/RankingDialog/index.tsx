import { Box, Dialog, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import Tabs from '@/components/Template/AuthTemplate/Tabs'
import { RankingReqData } from '@/types/analytics'
import { NotFound } from '@/v3/presentation/components/NotFound'

import PersonLoad from '../PersonLoad'
import { adapterRanking } from '../../../../UnitPanel/adapterRanking'
import { PersonType } from '..'

import { StyledDialog } from './styles'
import { RankingConfig, RankingDescription } from './config'

interface IModal {
  open?: boolean
  data?: RankingReqData
  dialogRanking: string
  setDialogRanking: React.Dispatch<React.SetStateAction<string>>
  onClose: () => void
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const RankingDialog = ({
  open,
  dialogRanking,
  setDialogRanking,
  data,
  onClose,
  setOpenModal,
}: IModal) => {
  let person: PersonType | null = null

  if (dialogRanking === RankingDescription.APPOINTMENTS)
    person = adapterRanking(data?.doctors || []) || []
  if (dialogRanking === RankingDescription.REQUESTS)
    person = adapterRanking(data?.patients || []) || []
  if (dialogRanking === RankingDescription.REQUESTED)
    person = adapterRanking(data?.claimants || []) || []

  return (
    <Dialog
      open={!!open}
      onClose={onClose}
      aria-labelledby='ranking-dialog'
      aria-describedby='ranking-description'
      maxWidth={false}
    >
      <StyledDialog>
        <Box display='flex' justifyContent='space-between' alignItems='flex-start'>
          <Typography variant='h3' color='primary'>
            Rankings
          </Typography>
          <CloseIcon
            className='cursor-pointer'
            onClick={() => {
              setOpenModal(false)
            }}
            fontSize='large'
            sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
          />
        </Box>
        <Tabs tabsValue={RankingConfig} value={dialogRanking} onChange={setDialogRanking} />
        {person?.length === 0 && (
          <Box py={2}>
            <NotFound />
          </Box>
        )}
        <PersonLoad person={person} />
      </StyledDialog>
    </Dialog>
  )
}

export default RankingDialog
