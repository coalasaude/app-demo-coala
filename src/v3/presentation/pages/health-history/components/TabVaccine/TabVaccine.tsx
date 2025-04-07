import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CoronavirusIcon from '@mui/icons-material/Coronavirus'
import VaccinesIcon from '@mui/icons-material/Vaccines'
import { Box, Grid } from '@mui/material'
import { useRouter } from 'next/router'

import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import Button from '@/v3/presentation/components/Button'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { TabsContainerWrapper } from '@/v3/presentation/components/TabsContainer'
import TabsContainerHeader from '@/v3/presentation/components/TabsContainerHeader'
import { useFetchBrowseUserVaccine } from '@/v3/presentation/hooks/api/@v2/health-history/vaccine/useFetchBrowseUserVaccine'
import {
  CAccordion,
  CAccordionBody,
  CAccordionList,
  CDisplayRecord,
} from '@/v3/presentation/newComponents'
import { CDialogue, useModalContext } from '@/v3/presentation/components/Modal'
import { useMutateDeleteUserVaccine } from '@/v3/presentation/hooks/api/@v2/health-history/vaccine/useMutateDeleteUserVaccine'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { useCheckCanManipulateHealthHistory } from '@/v3/presentation/hooks/useCheckCanManipulateHealthHistory'

import { DeleteIconButton } from '../DeleteIconButton'
import TabContentSkeleton from '../Skeletons/TabContentSkeleton'

export const TabVaccine = ({ userId }: { userId: number }) => {
  const { vaccines, isLoading } = useFetchBrowseUserVaccine({ userId })
  const deleteVaccine = useMutateDeleteUserVaccine()
  const { handleModal } = useModalContext()

  const { user } = useFetchReadUser({ userId: userId })
  const { canManipulate } = useCheckCanManipulateHealthHistory(user!)

  const router = useRouter()
  const handleView = (id: number) => {
    router.push(
      bindPathParams(`${NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.VACCINE.VIEW.path}`, {
        userId,
        id,
      })
    )
  }

  const handleDelete = async (id: number) => {
    if (!userId || !id) return
    deleteVaccine.mutateAsync({ vaccineId: id, userId })
  }

  const handleOpenModal = (id: number) => {
    handleModal(
      <CDialogue
        confirmButtonLabel='Confirmar'
        onConfirm={async () => handleDelete(id)}
        title='Excluir Vacina'
        description='Tem certeza que deseja excluir essa vacina?'
      />
    )
  }

  const accordionListVaccine = vaccines?.data?.map((vaccine) => {
    return {
      title: vaccine?.name,
      children: (
        <CAccordionBody
          secondaryButton={
            canManipulate && <DeleteIconButton onDelete={() => handleOpenModal(vaccine.id)} />
          }
          primaryButton={
            <Button variant='outlined' onClick={() => handleView(vaccine.id)}>
              Ver mais
            </Button>
          }
        >
          <Grid container spacing={2} padding={'16px 0px'}>
            <Grid item xs={12} sm={6}>
              <CDisplayRecord
                withDivider
                label='Doses'
                value={
                  vaccine.vaccineDosage.length > 0 ? (
                    <Box flex='row'>
                      {Array.from({ length: vaccine.vaccineDosage.length }).map((_, i) => (
                        <CheckCircleOutlineIcon key={i} color='success' />
                      ))}
                    </Box>
                  ) : (
                    ''
                  )
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CDisplayRecord
                withDivider
                withMinHeight
                label='Reforços'
                value={
                  vaccine.vaccineReinforcement.length > 0 ? (
                    <Box flex='row'>
                      {Array.from({ length: vaccine.vaccineReinforcement.length }).map((_, i) => (
                        <CheckCircleOutlineIcon key={i} color='success' />
                      ))}
                    </Box>
                  ) : (
                    ''
                  )
                }
              />
            </Grid>
          </Grid>
        </CAccordionBody>
      ),
      icon: vaccine?.name === 'COVID' ? <CoronavirusIcon /> : <VaccinesIcon />,
    }
  })

  const handleAddVaccine = () => {
    router.push(
      bindPathParams(`${NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.VACCINE.ADD.path}`, {
        userId,
      })
    )
  }

  if (!userId || isLoading) return <TabContentSkeleton repeat={4} />

  return (
    <TabsContainerWrapper>
      <TabsContainerHeader
        label='Vacinas'
        buttonLabel={canManipulate ? 'Adicionar' : undefined}
        onClick={handleAddVaccine}
      />
      {!vaccines?.data?.length ? (
        <NotFound text='Não existem vacinas cadastradas' />
      ) : (
        <CAccordionList
          numColumnsMobile={1}
          numColumnsDesktop={1}
          options={accordionListVaccine ?? []}
          renderItem={(props) => <CAccordion {...props} title={props.title ? props.title : ''} />}
        />
      )}
    </TabsContainerWrapper>
  )
}
