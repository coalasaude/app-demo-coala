import { Grid, Typography } from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import { CContainerContent, CDisplayRecord } from '@/v3/presentation/newComponents'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { CDialogue } from '@/v3/presentation/newComponents/layout/CDialogue'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { ViewSkeleton } from '@/components/Skeletons/ViewSkeleton'
import { useFetchBrowseBodyMass } from '@/v3/presentation/hooks/api/@v2/health-history/body-mass/useFetchBrowseBodyMass'
import { useMutateDeleteBodyMass } from '@/v3/presentation/hooks/api/@v2/health-history/body-mass/useMutateDeleteBodyMass'

export const HistoricUserInfoContainer = ({ selectedUserId }: { selectedUserId: number }) => {
  const { handleModal } = useModalContext()
  const { bodyMass, isLoading } = useFetchBrowseBodyMass({
    userId: selectedUserId,
  })
  const { mutateAsync: deleteBodyMassMutate } = useMutateDeleteBodyMass()

  if (!selectedUserId) return null

  if (isLoading) return <ViewSkeleton />

  const onDelete = (id: number) => {
    handleModal(
      <CDialogue
        confirmButtonLabel='Sim'
        cancelButtonLabel='Não'
        onConfirm={async () => {
          await deleteBodyMassMutate({ userId: selectedUserId, id })
        }}
        title='Atenção'
        description='Você tem certeza que deseja deletar essa medição?'
      />,
    )
  }
  return (
    <>
      <Typography variant='h4' mt={2} mb={2} fontWeight='700'>
        Histórico de altura e peso:
      </Typography>
      {bodyMass?.data && !isLoading && bodyMass?.data?.length > 0 ? (
        <Grid container spacing={2}>
          {bodyMass.data.map((bodyMass) => (
            <Grid item xs={12} sm={12} md={4} key={bodyMass.id}>
              <CContainerContent
                title={bodyMass.getFormattedMeasureDate()}
                icon={<DeleteOutlineOutlinedIcon sx={{ width: 20, height: 20 }} />}
                onClickIcon={() => onDelete(bodyMass.id)}
              >
                <Grid container spacing={2} mt={1}>
                  <Grid item xs={6}>
                    <CDisplayRecord
                      label='Altura'
                      value={`${bodyMass.height ? `${bodyMass.height}cm` : '-'}`}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <CDisplayRecord
                      label='Peso'
                      value={`${bodyMass.weight ? `${bodyMass.weight}kg` : '-'}`}
                    />
                  </Grid>
                </Grid>
              </CContainerContent>
            </Grid>
          ))}
        </Grid>
      ) : (
        <NotFound />
      )}
    </>
  )
}
