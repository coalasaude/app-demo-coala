import CircleIcon from '@mui/icons-material/Circle'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import { Box, Skeleton, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { GridItem, GridWrapper } from '@/components/Grid'
import { CBaseContainer } from '@/v3/presentation/components/CBaseContainer'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { downloadByProxy } from '@/v3/utils/downloadByProxy'
import { CDisplayRecord, PageHeader } from '@/v3/presentation/newComponents'
import { useFetchReadHistorySickNote } from '@/v3/presentation/hooks/api/@v2/health-history/sick-note/useFetchReadSickNote'
import { useMutateDeleteHistorySickNote } from '@/v3/presentation/hooks/api/@v2/health-history/sick-note/useMutateDeleteSickNote'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { useCheckCanManipulateHealthHistory } from '@/v3/presentation/hooks/useCheckCanManipulateHealthHistory'

import { CDialogue } from '../../../../../newComponents/layout/CDialogue'

export const SickNoteViewPage = () => {
  const { handleModal } = useModalContext()
  const router = useRouter()
  const userId = Number(router.query.userId as string)
  const { sickNote } = useFetchReadHistorySickNote({ userId, sickNoteId: Number(router.query.id) })
  const { mutateAsync: deleteHistorySickNoteMutate } = useMutateDeleteHistorySickNote()

  const { user } = useFetchReadUser({ userId: userId })
  const { canManipulate } = useCheckCanManipulateHealthHistory(user!)

  const onDelete = async () => {
    handleModal(
      <CDialogue
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={async () => {
          router.back()
          await deleteHistorySickNoteMutate({ userId: userId, sickNoteId: Number(router.query.id) })
        }}
        title='Atenção'
        description='Você tem certeza que deseja deletar este atestado?'
      />
    )
  }

  if (!sickNote) return <Skeleton variant='rectangular' height={120} />

  return (
    <>
      <PageHeader title='Ficha de saúde' />
      <Box>
        <CBaseContainer
          title='Dados do atestado'
          buttonLabel='Baixar atestado'
          minWidth='170px'
          startIcon={<FileDownloadOutlinedIcon />}
          onConfirm={() => {
            if (sickNote.document?.url) {
              downloadByProxy({ url: sickNote.document.url })
            }
          }}
          infoTitle={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                justifyContent: 'space-between',
              }}
            >
              <CircleIcon
                sx={{
                  width: '10px',
                  color:
                    sickNote.getStatusLabel() === 'Vigente'
                      ? 'var(--mui-palette-success-main)'
                      : 'var(--mui-palette-grey-600)',
                }}
              />
              {sickNote.getStatusLabel()}
            </Box>
          }
        >
          <Box>
            <GridWrapper>
              <GridItem xs={6} md={4}>
                <CDisplayRecord
                  withDivider
                  label='Tipo de atestado'
                  value={sickNote.getTypeLabel()}
                />
              </GridItem>
              <GridItem xs={6} md={4}>
                <CDisplayRecord
                  withDivider
                  label='Data do atendimento'
                  value={sickNote.getFormattedAppointmentDate()}
                />
              </GridItem>
              <GridItem xs={6} md={4}>
                <CDisplayRecord
                  withDivider
                  label='Hora do atendimento'
                  value={sickNote.getFormattedAppointmentHour()}
                />
              </GridItem>
              <GridItem xs={6} md={4}>
                <CDisplayRecord
                  withDivider
                  label='Dias de atestado'
                  value={sickNote.getSickNoteValidityPeriodString()}
                />
              </GridItem>
              <GridItem xs={12} md={4}>
                <CDisplayRecord
                  withDivider
                  label='Data de validade'
                  value={sickNote.getFormattedValidUntil()}
                />
              </GridItem>
              <GridItem xs={12} md={4}>
                <CDisplayRecord withDivider label='Diagnóstico' value={sickNote.description} />
              </GridItem>
              {canManipulate && (
                <GridItem xs={12} mt={1}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      ':hover': {
                        cursor: 'pointer',
                      },
                    }}
                    onClick={onDelete}
                  >
                    <DeleteOutlineOutlinedIcon />
                    <Typography>Excluir</Typography>
                  </Box>
                </GridItem>
              )}{' '}
            </GridWrapper>
          </Box>
        </CBaseContainer>
      </Box>
    </>
  )
}
