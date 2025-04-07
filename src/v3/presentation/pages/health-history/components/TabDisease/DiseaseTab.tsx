import { Grid } from '@mui/material'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import Button from '@/v3/presentation/components/Button'
import { CardTextDownload } from '@/v3/presentation/components/CardText/CardTextDownload'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { TabsContainerWrapper } from '@/v3/presentation/components/TabsContainer'
import TabsContainerHeader from '@/v3/presentation/components/TabsContainerHeader'
import { useFetchBrowseDisease } from '@/v3/presentation/hooks/api/@v2/health-history/diseases/useFetchBrowseDisease'
import { useMutateDeleteDisease } from '@/v3/presentation/hooks/api/@v2/health-history/diseases/useMutateDeleteDisease'
import {
  CAccordion,
  CAccordionBody,
  CAccordionList,
  CDisplayRecord,
} from '@/v3/presentation/newComponents'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { useCheckCanManipulateHealthHistory } from '@/v3/presentation/hooks/useCheckCanManipulateHealthHistory'

import { CDialogue } from '../../../../newComponents/layout/CDialogue'
import { DeleteIconButton } from '../DeleteIconButton'
import TabContentSkeleton from '../Skeletons/TabContentSkeleton'

export const TabDisease = ({ userId }: { userId?: number }) => {
  const router = useRouter()
  const { diseases, isPending: isLoading } = useFetchBrowseDisease({ userId: userId! })
  const { handleModal } = useModalContext()
  const onDeleteDisease = useMutateDeleteDisease()

  const { user } = useFetchReadUser({ userId: userId! })
  const { canManipulate } = useCheckCanManipulateHealthHistory(user!)

  const handleDelete = async (id: number) => {
    if (!userId || !id) return
    onDeleteDisease.mutateAsync({ diseaseId: id, userId })
  }

  const handleEditDisease = (id: string) => {
    router.push(
      bindPathParams(`${NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.DISEASES.EDIT.path}`, {
        userId,
        id,
      })
    )
  }

  if (!userId || isLoading) return <TabContentSkeleton repeat={4} />

  const handleOpenModal = (id: number) => {
    handleModal(
      <CDialogue
        confirmButtonLabel='Confirmar'
        onConfirm={async () => handleDelete(id)}
        title='Excluir Doença'
        description='Tem certeza que deseja excluir essa doença?'
      />
    )
  }

  const handleAdd = () => {
    router.push(
      bindPathParams(`${NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.DISEASES.ADD.path}`, {
        userId,
      })
    )
  }

  const accordionListDiseases =
    diseases?.data?.map((disease) => {
      return {
        title: disease.getDiseaseName(),
        children: (
          <CAccordionBody
            secondaryButton={
              canManipulate && <DeleteIconButton onDelete={() => handleOpenModal(disease.id)} />
            }
            primaryButton={
              canManipulate && (
                <Button onClick={() => handleEditDisease(String(disease.id))} variant='outlined'>
                  Editar
                </Button>
              )
            }
          >
            <Grid container spacing={2} padding={'16px 0px'}>
              <Grid item xs={12} sm={12}>
                <CDisplayRecord
                  withDivider
                  label='Fez Tratamento'
                  value={disease.treatmentPerformed ? 'Sim' : 'Não'}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <CDisplayRecord withDivider label='Observações' value={disease.observation} />
              </Grid>
              {disease.document && (
                <Grid item xs={12} sm={12}>
                  <CardTextDownload
                    withDivider
                    label='Documento médico'
                    url={disease.document?.url || ''}
                    filename={disease.document?.formattedName || ''}
                  />
                </Grid>
              )}
            </Grid>
          </CAccordionBody>
        ),
        subtitle: dayjs(disease.diagnoseDate).format('DD/MM/YYYY'),
      }
    }) || []

  return (
    <TabsContainerWrapper>
      <TabsContainerHeader
        label='Doenças'
        buttonLabel={canManipulate ? 'Adicionar' : undefined}
        key='DoençaBody'
        onClick={handleAdd}
      />
      {diseases?.data.length === 0 ? (
        <NotFound text='Não existem doenças cadastradas' />
      ) : (
        <CAccordionList
          numColumnsMobile={1}
          numColumnsDesktop={2}
          options={accordionListDiseases}
          renderItem={(props) => <CAccordion {...props} />}
        />
      )}
    </TabsContainerWrapper>
  )
}
