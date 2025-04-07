import {
  MoreHoriz,
  MedicationOutlined,
  MasksOutlined,
  EmojiNature,
  BreakfastDiningOutlined,
} from '@mui/icons-material'
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

import ProductAllergyIcon from '/public/assets/svg/AllergyCategories/productAllergyIcon.svg'
import SkinAllergyIcon from '/public/assets/svg/AllergyCategories/skinAllergyIcon.svg'

import { NEW_ROUTES } from '@/constants/routes'
import { bindPathParams } from '@/utils/bindParams'
import { useModalContext } from '@/v3/presentation/components/Modal'
import { NotFound } from '@/v3/presentation/components/NotFound'
import { TabsContainerWrapper } from '@/v3/presentation/components/TabsContainer'
import TabsContainerHeader from '@/v3/presentation/components/TabsContainerHeader'
import { useMutateDeleteAllergy } from '@/v3/presentation/hooks/api/@v2/health-history/allergies/useMutateDeleteAllergy'
import {
  CAccordion,
  CAccordionBody,
  CAccordionList,
  CDisplayRecord,
} from '@/v3/presentation/newComponents'
import { useFetchBrowseAllergy } from '@/v3/presentation/hooks/api/@v2/health-history/allergies/useFetchBrowseAllergy'
import { useFetchReadUser } from '@/v3/presentation/hooks/api/@v2/users/users/useFetchReadUser'
import { useCheckCanManipulateHealthHistory } from '@/v3/presentation/hooks/useCheckCanManipulateHealthHistory'

import { CDialogue } from '../../../../newComponents/layout/CDialogue'
import { DeleteIconButton } from '../DeleteIconButton'
import TabContentSkeleton from '../Skeletons/TabContentSkeleton'

import { DeniesAllergies } from './components/DeniesAllergies'

export const TabAllergy = ({ userId }: { userId?: number }) => {
  const { allergies, isPending: isLoading } = useFetchBrowseAllergy({ userId: userId! })
  const { user } = useFetchReadUser({ userId: userId! })
  const deleteAllergy = useMutateDeleteAllergy()
  const { handleModal } = useModalContext()
  const router = useRouter()
  const [expanded, setExpanded] = useState<number | false>(false)

  const { canManipulate, isSameUserOrChild } = useCheckCanManipulateHealthHistory(user!)

  const allergyIconMap = {
    Respiratória: <MasksOutlined />,
    Alimentar: <BreakfastDiningOutlined />,
    Medicamentosa: <MedicationOutlined />,
    Produtos: <ProductAllergyIcon />,
    Pele: <SkinAllergyIcon />,
    Ambiental: <EmojiNature />,
  }

  const handleDelete = async (id: number) => {
    if (!userId || !id) return
    deleteAllergy.mutateAsync({ allergyId: id, userId })
  }

  const handleOpenDeleteModal = (id: number) => {
    handleModal(
      <CDialogue
        confirmButtonLabel='Confirmar'
        onConfirm={async () => handleDelete(id)}
        title='Excluir alergia'
        description='Tem certeza que deseja excluir essa alergia?'
      />,
    )
  }

  const handleAddAllergy = () => {
    router.push(
      bindPathParams(`${NEW_ROUTES.AUTHENTICATED.USERS.HEALTH_HISTORIC.ALLERGY.ADD.path}`, {
        userId,
      }),
    )
  }

  const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  if (!userId || isLoading) return <TabContentSkeleton repeat={4} />

  return (
    <TabsContainerWrapper>
      <TabsContainerHeader
        label='Alergias'
        buttonLabel={canManipulate ? 'Adicionar' : undefined}
        onClick={handleAddAllergy}
      />
      {allergies?.data?.length === 0 && !user?.deniesAllergies ? (
        <NotFound text='Não existem alergias cadastradas' />
      ) : (
        <CAccordionList
          numColumnsMobile={1}
          numColumnsDesktop={1}
          options={allergies?.data || []}
          renderItem={(allergy) => {
            const categoryName = allergy.category?.name
            const icon = allergyIconMap[categoryName as keyof typeof allergyIconMap]

            return (
              <CAccordion
                expanded={expanded === allergy.id}
                onChange={canManipulate || isSameUserOrChild ? handleChange(allergy.id) : undefined}
                title={allergy.causerAgent}
                icon={categoryName && icon ? icon : <MoreHoriz />}
              >
                <CAccordionBody
                  secondaryButton={
                    canManipulate && (
                      <DeleteIconButton onDelete={() => handleOpenDeleteModal(allergy.id)} />
                    )
                  }
                >
                  <Grid container spacing={2} padding={'16px 0px'}>
                    <Grid item xs={12} sm={6}>
                      <CDisplayRecord withDivider label='Categoria' value={categoryName || ''} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CDisplayRecord
                        withDivider
                        label='Principais sintomas'
                        value={allergy.getFormattedAllergySymptom()}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <CDisplayRecord
                        withDivider
                        label='Observações'
                        value={allergy.orientations}
                      />
                    </Grid>
                  </Grid>
                </CAccordionBody>
              </CAccordion>
            )
          }}
        />
      )}
      {user?.deniesAllergies && allergies?.data?.length === 0 && (
        <DeniesAllergies text='Não tem alergia' />
      )}
    </TabsContainerWrapper>
  )
}
